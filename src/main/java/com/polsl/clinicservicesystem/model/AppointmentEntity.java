package com.polsl.clinicservicesystem.model;


import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "appointments")
public class AppointmentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private LocalDateTime appointmentTime;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private UserEntity doctor;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private PatientEntity patient;

  @Enumerated(EnumType.STRING)
  private AppointmentStatus status;

  private String diagnosis;

  private String description;

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

  public UserEntity getDoctor() {
    return doctor;
  }

  public void setDoctor(UserEntity doctor) {
    this.doctor = doctor;
  }

  public PatientEntity getPatient() {
    return patient;
  }

  public void setPatient(PatientEntity patient) {
    this.patient = patient;
  }

  public AppointmentStatus getStatus() {
    return status;
  }

  public void setStatus(AppointmentStatus status) {
    this.status = status;
  }

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
