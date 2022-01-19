package com.polsl.clinicservicesystem.service;

import com.polsl.clinicservicesystem.dto.user.EditUserRequest;
import com.polsl.clinicservicesystem.dto.user.RegisterUserRequest;
import com.polsl.clinicservicesystem.dto.user.UserResponse;
import com.polsl.clinicservicesystem.exception.BadRequestException;
import com.polsl.clinicservicesystem.model.RoleEntity;
import com.polsl.clinicservicesystem.model.UserEntity;
import com.polsl.clinicservicesystem.repository.RoleRepository;
import com.polsl.clinicservicesystem.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;

  private final int maxNumberOfFailedLogins = 3;

  public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public void registerNewUser(RegisterUserRequest request) {
    UserEntity newUser = new UserEntity();

    if (userRepository.existsByUsername(request.getUsername())) {
      throw new BadRequestException("User with this username already exists");
    }
    if (userRepository.existsByEmailAddress(request.getEmail())) {
      throw new BadRequestException("User with this email address already exists");
    }

    RoleEntity role = roleRepository.findById(request.getRole()).orElseThrow(() -> {
      throw new BadRequestException("Role provided for user doesn't exist");
    });

    newUser.setUsername(request.getUsername());
    newUser.setPassword(passwordEncoder.encode(request.getPassword()));
    newUser.setEmailAddress(request.getEmail());
    newUser.setActive(true);
    newUser.setRole(role);
    newUser.setFirstName(request.getFirstName());
    newUser.setLastName(request.getLastName());
    userRepository.save(newUser);
  }

  public List<?> getUsers() {
    List<UserEntity> users = userRepository.findAll();
    return users
        .stream()
        .map(UserResponse::fromEntity)
        .collect(Collectors.toList());
  }

  public UserResponse getUser(Integer id) {
    UserEntity user = userRepository
        .findById(id)
        .orElseThrow(() -> new BadRequestException("User not found"));
    return UserResponse.fromEntity(user);
  }

  public void editUser(Integer id, EditUserRequest request) {
    UserEntity user = userRepository
        .findById(id)
        .orElseThrow(() -> new BadRequestException("User not found"));
    user.setUsername(request.getUsername());
    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setEmailAddress(request.getEmail());
    if (StringUtils.isNotBlank(request.getPassword())) {
      user.setPassword(passwordEncoder.encode(request.getPassword()));
    }
    userRepository.save(user);
  }

  public void disableUser(Integer id) {
    UserEntity user = userRepository
        .findById(id)
        .orElseThrow(() -> new BadRequestException("User not found"));
    user.setActive(false);
    userRepository.save(user);
  }

  public List<UserResponse> getDoctors() {
    return userRepository.findAllByRole_Code("DOC")
        .stream()
        .map(UserResponse::fromEntity)
        .collect(Collectors.toList());
  }

  public void handleCorrectAuthentication(String username) {
    userRepository.findByUsername(username).ifPresent((user) ->  {
      if (!user.isBlocked()) {
        user.setNumberOfFailedLogins(0);
        userRepository.save(user);
        return;
      }
      throw new BadRequestException("Account is locked for user with username: " + user.getUsername());
    });
  }

  public void handleFailedAuthentication(String username) {
    userRepository.findByUsername(username).ifPresent((user) -> {
      if (user.isBlocked()) {
        throw new BadRequestException("Account is locked for user with username: " + user.getUsername());
      }
      user.setNumberOfFailedLogins(user.getNumberOfFailedLogins() + 1);
      if (user.getNumberOfFailedLogins() > maxNumberOfFailedLogins) {
        user.setBlocked(true);
      }
      userRepository.save(user);
    });
  }

  public void unlockAccount(Integer id) {
    userRepository.findById(id).ifPresent((user) -> {
      user.setBlocked(false);
      user.setNumberOfFailedLogins(0);
      userRepository.save(user);
    });
  }
}
