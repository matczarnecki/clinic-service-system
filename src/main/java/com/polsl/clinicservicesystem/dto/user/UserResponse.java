package com.polsl.clinicservicesystem.dto.user;

import com.polsl.clinicservicesystem.model.UserEntity;

public class UserResponse {

  private Integer id;

  private String username;

  private String emailAddress;

  private boolean isActive;

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

  public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }

  public boolean isActive() {
    return isActive;
  }

  public void setActive(boolean active) {
    isActive = active;
  }

  public static UserResponse fromEntity(UserEntity entity) {
    UserResponse response = new UserResponse();
    response.setId(entity.getId());
    response.setUsername(entity.getUsername());
    response.setEmailAddress(entity.getEmailAddress());
    response.setActive(entity.isActive());
    return response;
  }
}
