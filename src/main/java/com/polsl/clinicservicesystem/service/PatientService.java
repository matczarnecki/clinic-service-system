package com.polsl.clinicservicesystem.service;

import com.polsl.clinicservicesystem.dto.patient.PatientRequestResponse;
import com.polsl.clinicservicesystem.model.PatientEntity;
import com.polsl.clinicservicesystem.repository.PatientRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
  private final PatientRepository patientRepository;

  public PatientService(PatientRepository patientRepository) {
    this.patientRepository = patientRepository;
  }

  public List<PatientRequestResponse> getPatients() {
    return patientRepository.findAll()
        .stream()
        .map(PatientRequestResponse::fromEntity)
        .collect(Collectors.toList());
  }

  public void addPatient(PatientRequestResponse request) {
    PatientEntity patient = new PatientEntity();
    patient.setFirstName(request.getFirstName());
    patient.setLastName(request.getLastName());
    patientRepository.save(patient);
  }
}
