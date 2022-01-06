package com.polsl.clinicservicesystem.dto.appointment;

import com.polsl.clinicservicesystem.dto.patient.PatientRequestResponse;
import com.polsl.clinicservicesystem.dto.user.UserResponse;
import com.polsl.clinicservicesystem.model.AppointmentEntity;

public class AppointmentFullResponse extends AppointmentResponse {
  private String diagnosis;
  private String description;

  public String getDiagnosis() {
    return diagnosis;
  }

  public void setDiagnosis(String diagnosis) {
    this.diagnosis = diagnosis;
  }


  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public static AppointmentFullResponse fromEntity(AppointmentEntity entity) {
    AppointmentFullResponse dto = new AppointmentFullResponse();
    dto.setId(entity.getId());
    dto.setAppointmentTime(entity.getAppointmentTime());
    dto.setDoctor(UserResponse.fromEntity(entity.getDoctor()));
    dto.setPatient(PatientRequestResponse.fromEntity(entity.getPatient()));
    dto.setStatus(entity.getStatus());
    dto.setDiagnosis(entity.getDiagnosis());
    dto.setDescription(entity.getDescription());
    return dto;
  }
}
