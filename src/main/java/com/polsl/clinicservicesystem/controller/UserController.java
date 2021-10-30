package com.polsl.clinicservicesystem.controller;

import com.polsl.clinicservicesystem.dto.ApiBasicResponse;
import com.polsl.clinicservicesystem.dto.user.RegisterUserRequest;
import com.polsl.clinicservicesystem.service.UserService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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
    return new ResponseEntity<>(new ApiBasicResponse(true,
        "Successful registration"), HttpStatus.CREATED);
  }

  @GetMapping
  @PreAuthorize("hasAuthority('CAN_SEE_USERS')")
  public List<?> getUsers() {
    return userService.getUsers();
  }
}
