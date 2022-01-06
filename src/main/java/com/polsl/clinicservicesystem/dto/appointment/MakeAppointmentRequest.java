package com.polsl.clinicservicesystem.dto.appointment;

import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public class MakeAppointmentRequest {

  @NotBlank
  @Length(max = 255)
  private String diagnosis;

  @NotBlank
  @Length(max = 255)
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
}
