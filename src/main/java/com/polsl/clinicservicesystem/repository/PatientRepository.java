package com.polsl.clinicservicesystem.repository;

import com.polsl.clinicservicesystem.model.PatientEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface PatientRepository extends CrudRepository<PatientEntity, Integer> {
  List<PatientEntity> findAll();
}
