package com.polsl.clinicservicesystem.repository;

import com.polsl.clinicservicesystem.model.AppointmentEntity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface AppointmentRepository extends CrudRepository<AppointmentEntity, Integer> {

  default List<AppointmentEntity> findByAppointmentDate(LocalDate localDate) {
    return findByAppointmentTimeBetween(localDate.atStartOfDay(), localDate.plusDays(1).atStartOfDay());
  }

  default List<AppointmentEntity> findByAppointmentDateAndDoctor_Id(LocalDate localDate, Integer doctorId) {
    return findByAppointmentTimeBetweenAndDoctor_Id(localDate.atStartOfDay(), localDate.plusDays(1).atStartOfDay(),
        doctorId);
  }

  List<AppointmentEntity> findByAppointmentTimeBetween(LocalDateTime from, LocalDateTime to);

  List<AppointmentEntity> findByAppointmentTimeBetweenAndDoctor_Id(LocalDateTime from, LocalDateTime to,
                                                                    Integer doctorId);

  List<AppointmentEntity> findAllByAppointmentTimeBefore(LocalDateTime appointmentTime);
}
