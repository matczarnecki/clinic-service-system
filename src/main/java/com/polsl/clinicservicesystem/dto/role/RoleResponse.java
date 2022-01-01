package com.polsl.clinicservicesystem.dto.role;

import com.polsl.clinicservicesystem.model.RoleEntity;

public class RoleResponse {
  private String code;
  private String name;

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public static RoleResponse fromEntity(RoleEntity entity) {
    RoleResponse role = new RoleResponse();
    role.setCode(entity.getCode());
    role.setName(entity.getName());
    return role;
  }
}
