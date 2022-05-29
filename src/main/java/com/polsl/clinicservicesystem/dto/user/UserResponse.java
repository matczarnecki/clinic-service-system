package com.polsl.clinicservicesystem.dto.user;

import com.polsl.clinicservicesystem.model.UserEntity;

public class UserResponse {

  private Integer id;

  private String username;

  private String email;

  private boolean isActive;

  private String role;

  private String firstName;

  private String lastName;

  private boolean isBlocked;

  public static UserResponse fromEntity(UserEntity entity) {
    UserResponse response = new UserResponse();
    response.setId(entity.getId());
    response.setUsername(entity.getUsername());
    response.setEmail(entity.getEmailAddress());
    response.setActive(entity.isActive());
    response.setRole(entity.getRole().getCode());
    response.setFirstName(entity.getFirstName());
    response.setLastName(entity.getLastName());
    response.setBlocked(entity.isBlocked());
    return response;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public boolean isActive() {
    return isActive;
  }

  public void setActive(boolean active) {
    isActive = active;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public boolean isBlocked() {
    return isBlocked;
  }

  public void setBlocked(final boolean blocked) {
    isBlocked = blocked;
  }
}
