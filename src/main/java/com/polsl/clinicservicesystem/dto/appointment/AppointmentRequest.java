package com.polsl.clinicservicesystem.dto.appointment;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import java.time.LocalDateTime;
import javax.validation.constraints.NotNull;

public class AppointmentRequest {

  @NotNull
  @JsonDeserialize(using = LocalDateTimeDeserializer.class)
  private LocalDateTime appointmentTime;

  @NotNull
  private Integer doctorId;

  @NotNull
  private Integer patientId;

  public LocalDateTime getAppointmentTime() {
    return appointmentTime;
  }

  public void setAppointmentTime(LocalDateTime appointmentTime) {
    this.appointmentTime = appointmentTime;
  }

  public Integer getDoctorId() {
    return doctorId;
  }

  public void setDoctorId(Integer doctorId) {
    this.doctorId = doctorId;
  }

  public Integer getPatientId() {
    return patientId;
  }

  public void setPatientId(Integer patientId) {
    this.patientId = patientId;
  }
}
