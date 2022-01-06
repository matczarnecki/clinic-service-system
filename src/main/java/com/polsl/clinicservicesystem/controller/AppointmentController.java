package com.polsl.clinicservicesystem.controller;

import com.polsl.clinicservicesystem.dto.appointment.AppointmentRequest;
import com.polsl.clinicservicesystem.dto.appointment.MakeAppointmentRequest;
import com.polsl.clinicservicesystem.security.CustomUserDetails;
import com.polsl.clinicservicesystem.service.AppointmentService;
import java.time.LocalDate;
import javax.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/appointments")
public class AppointmentController {
  private final AppointmentService appointmentService;

  public AppointmentController(AppointmentService appointmentService) {
    this.appointmentService = appointmentService;
  }

  @GetMapping()
  @PreAuthorize("hasAuthority('CAN_SEE_APPOINTMENTS')")
  public ResponseEntity<?> getAppointments(@RequestParam(name = "date", required = true)
                                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                               LocalDate date,
                                           @RequestParam(name = "doctor", required = false) Integer doctorId) {
    return ResponseEntity.ok(appointmentService.getAppointmentsForDay(date, null));
  }

  @GetMapping("/doctor")
  @PreAuthorize("hasAuthority('CAN_SEE_FULL_APPOINTMENTS')")
  public ResponseEntity<?> getDoctorAppointments(@RequestParam(name = "date", required = true)
                                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                     LocalDate date, Authentication auth) {
    CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
    return ResponseEntity.ok(appointmentService.getDoctorAppointmentsForDay(date, user.getId()));
  }


  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('CAN_CANCEL_APPOINTMENTS')")
  public ResponseEntity<?> cancelAppointment(@PathVariable Integer id) {
    appointmentService.cancelAppointment(id);
    return ResponseEntity.ok("The appointment was cancelled!");
  }

  @PostMapping()
  @PreAuthorize("hasAuthority('CAN_ADD_APPOINTMENTS')")
  public ResponseEntity<?> addAppointment(@RequestBody @Valid AppointmentRequest request) {
    appointmentService.createAppointment(request);
    return ResponseEntity.ok("The appointment was scheduled!");
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasAuthority('CAN_SEE_FULL_APPOINTMENTS')")
  public ResponseEntity<?> getAppointment(@PathVariable Integer id) {
    return ResponseEntity.ok(appointmentService.getAppointment(id));
  }

  @GetMapping("/patient/{appointmentId}")
  @PreAuthorize("hasAuthority('CAN_SEE_PATIENT_APPOINTMENTS')")
  public ResponseEntity<?> getPatientAppointments(@PathVariable Integer appointmentId) {
    return ResponseEntity.ok(appointmentService.getPatientAppointments(appointmentId));
  }

  @PatchMapping("/{id}")
  @PreAuthorize("hasAuthority('CAN_MAKE_APPOINTMENTS')")
  public ResponseEntity<?> makeAppointment(@PathVariable Integer id,
                                           @RequestBody @Valid MakeAppointmentRequest request) {
    appointmentService.makeAppointment(id, request);
    return ResponseEntity.ok("The appointment has been finished!");
  }
}
