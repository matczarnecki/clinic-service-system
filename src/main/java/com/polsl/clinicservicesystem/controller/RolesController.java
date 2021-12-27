package com.polsl.clinicservicesystem.controller;

import com.polsl.clinicservicesystem.dto.ApiBasicResponse;
import com.polsl.clinicservicesystem.dto.user.RegisterUserRequest;
import com.polsl.clinicservicesystem.security.CustomUserDetails;
import com.polsl.clinicservicesystem.service.RolesService;
import com.polsl.clinicservicesystem.service.UserService;
import java.util.List;
import javax.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
