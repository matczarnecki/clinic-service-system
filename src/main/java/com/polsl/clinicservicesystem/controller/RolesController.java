package com.polsl.clinicservicesystem.controller;

import com.polsl.clinicservicesystem.service.RolesService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/roles")
public class RolesController {

  private final RolesService rolesService;

  public RolesController(RolesService rolesService) {
    this.rolesService = rolesService;
  }

  @GetMapping()
  @PreAuthorize("hasAuthority('CAN_SEE_ROLES')")
  public ResponseEntity<?> getRoles() {
    return ResponseEntity.ok(rolesService.getRoles());
  }
}
