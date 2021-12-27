package com.polsl.clinicservicesystem.service;

import com.polsl.clinicservicesystem.dto.role.RoleResponse;
import com.polsl.clinicservicesystem.repository.RoleRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class RolesService {

  private final RoleRepository roleRepository;

  public RolesService(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  public List<?> getRoles() {
    return roleRepository
        .findAll()
        .stream()
        .map(RoleResponse::fromEntity)
        .collect(Collectors.toList());
  }
}
