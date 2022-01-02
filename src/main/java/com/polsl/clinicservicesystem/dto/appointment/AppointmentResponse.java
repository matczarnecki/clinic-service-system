package com.polsl.clinicservicesystem.dto.appointment;

import com.polsl.clinicservicesystem.dto.patient.PatientRequestResponse;
import com.polsl.clinicservicesystem.dto.user.UserResponse;
import com.polsl.clinicservicesystem.model.AppointmentEntity;
import com.polsl.clinicservicesystem.model.AppointmentStatus;
import java.time.LocalDateTime;

public class AppointmentResponse {
  private Integer id;
  private LocalDateTime appointmentTime;
  private UserResponse doctor;
  private PatientRequestResponse patient;
  private AppointmentStatus status;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public LocalDateTime getAppointmentTime() {
    return appointmentTime;
  }

  public void setAppointmentTime(LocalDateTime appointmentTime) {
    this.appointmentTime = appointmentTime;
  }

  public UserResponse getDoctor() {
    return doctor;
  }

  public void setDoctor(UserResponse doctor) {
    this.doctor = doctor;
  }

  public PatientRequestResponse getPatient() {
    return patient;
  }

  public void setPatient(PatientRequestResponse patient) {
    this.patient = patient;
  }

  public AppointmentStatus getStatus() {
    return status;
  }

  public void setStatus(AppointmentStatus status) {
    this.status = status;
  }

  public static AppointmentResponse fromEntity(AppointmentEntity entity) {
    AppointmentResponse dto = new AppointmentResponse();
    dto.setId(entity.getId());
    dto.setAppointmentTime(entity.getAppointmentTime());
    dto.setDoctor(UserResponse.fromEntity(entity.getDoctor()));
    dto.setPatient(PatientRequestResponse.fromEntity(entity.getPatient()));
    dto.setStatus(entity.getStatus());
    return dto;
  }
}
