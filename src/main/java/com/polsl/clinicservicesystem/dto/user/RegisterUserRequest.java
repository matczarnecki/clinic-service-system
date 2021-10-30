package com.polsl.clinicservicesystem.dto.user;

import javax.validation.constraints.NotBlank;

public class RegisterUserRequest {

  @NotBlank
  private String username;

  @NotBlank
  private String password;

  @NotBlank
  private String emailAddress;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }
}
