package com.polsl.clinicservicesystem.controller;

import com.polsl.clinicservicesystem.dto.authentication.AuthenticationRequest;
import com.polsl.clinicservicesystem.dto.authentication.AuthenticationResponse;
import com.polsl.clinicservicesystem.exception.BadRequestException;
import com.polsl.clinicservicesystem.security.CustomUserDetailsService;
import com.polsl.clinicservicesystem.service.UserService;
import com.polsl.clinicservicesystem.utility.JwtUtility;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/authentication")
public class AuthenticationController {

  private final AuthenticationManager authenticationManager;
  private final CustomUserDetailsService customUserDetailsService;
  private final UserService userService;
  private final JwtUtility jwtUtility;

  public AuthenticationController(AuthenticationManager authenticationManager,
                                  CustomUserDetailsService customUserDetailsService,
                                  final UserService userService, JwtUtility jwtUtility) {
    this.authenticationManager = authenticationManager;
    this.customUserDetailsService = customUserDetailsService;
    this.userService = userService;
    this.jwtUtility = jwtUtility;
  }

  @PostMapping
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthenticationRequest request) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    } catch (BadCredentialsException e) {
      userService.handleFailedAuthentication(request.getUsername());
      throw new BadRequestException("Incorrect username or password", e);
    }

    userService.handleCorrectAuthentication(request.getUsername());
    final UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getUsername());
    final String jwt = jwtUtility.generateToken(userDetails);
    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }
}
