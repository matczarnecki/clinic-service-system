package com.polsl.clinicservicesystem.service;

import com.polsl.clinicservicesystem.dto.user.RegisterUserRequest;
import com.polsl.clinicservicesystem.dto.user.UserResponse;
import com.polsl.clinicservicesystem.exception.AppException;
import com.polsl.clinicservicesystem.exception.BadRequestException;
import com.polsl.clinicservicesystem.model.RoleEntity;
import com.polsl.clinicservicesystem.model.UserEntity;
import com.polsl.clinicservicesystem.repository.RoleRepository;
import com.polsl.clinicservicesystem.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;

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
    if (userRepository.existsByEmailAddress(request.getEmailAddress())) {
      throw new BadRequestException("User with this email address already exists");
    }

    newUser.setUsername(request.getUsername());
    newUser.setPassword(passwordEncoder.encode(request.getPassword()));
    newUser.setEmailAddress(request.getEmailAddress());
    newUser.setActive(true);
    RoleEntity role = roleRepository.findByName("ROLE_USER")
        .orElseThrow(() -> new AppException("Role provided for user doesn't exist"));
    newUser.setRoles(Stream.of(role).collect(Collectors.toSet()));
    userRepository.save(newUser);
  }

  public List<?> getUsers() {
    List<UserEntity> users = userRepository.findAll();
    return users
        .stream()
        .map(UserResponse::fromEntity)
        .collect(Collectors.toList());
  }
}
