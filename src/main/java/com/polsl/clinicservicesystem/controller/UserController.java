package com.polsl.clinicservicesystem.controller;

import com.polsl.clinicservicesystem.dto.user.EditUserRequest;
import com.polsl.clinicservicesystem.dto.user.RegisterUserRequest;
import com.polsl.clinicservicesystem.security.CustomUserDetails;
import com.polsl.clinicservicesystem.service.UserService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/registration")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserRequest request) {
    userService.registerNewUser(request);
    return ResponseEntity.ok("Successful registration");
  }

  @GetMapping
  @PreAuthorize("hasAuthority('CAN_SEE_USERS')")
  public List<?> getUsers() {
    return userService.getUsers();
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasAuthority('CAN_SEE_USERS')")
  public ResponseEntity<?> getUser(@PathVariable Integer id) {
    return ResponseEntity.ok(userService.getUser(id));
  }

  @GetMapping("/me")
  public ResponseEntity<?> getLoggedUser(Authentication auth) {
    CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
    return ResponseEntity.ok(userService.getUser(user.getId()));
  }

  @PatchMapping("/{id}")
  @PreAuthorize("hasAuthority('CAN_EDIT_USERS')")
  public ResponseEntity<?> editUser(@PathVariable Integer id, @RequestBody @Valid EditUserRequest request) {
    userService.editUser(id, request);
    return ResponseEntity.ok("User has been modified");
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('CAN_EDIT_USERS')")
  public ResponseEntity<?> disableUser(@PathVariable Integer id) {
    userService.disableUser(id);
    return ResponseEntity.ok("User has been disabled!");
  }

  @PatchMapping("{id}/unlock")
  @PreAuthorize("hasAuthority('CAN_EDIT_USERS')")
  public ResponseEntity<?> unlockAccount(@PathVariable Integer id) {
    userService.unlockAccount(id);
    return ResponseEntity.ok("Account has been unlocked!");
  }

  @GetMapping("/doctors")
  @PreAuthorize("hasAuthority('CAN_SEE_DOCTORS')")
  public List<?> getDoctors() {
    return userService.getDoctors();
  }
}
