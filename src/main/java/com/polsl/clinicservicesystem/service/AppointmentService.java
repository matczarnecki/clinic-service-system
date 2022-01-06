package com.polsl.clinicservicesystem.service;

import com.polsl.clinicservicesystem.dto.appointment.AppointmentFullResponse;
import com.polsl.clinicservicesystem.dto.appointment.AppointmentRequest;
import com.polsl.clinicservicesystem.dto.appointment.AppointmentResponse;
import com.polsl.clinicservicesystem.dto.appointment.MakeAppointmentRequest;
import com.polsl.clinicservicesystem.exception.BadRequestException;
import com.polsl.clinicservicesystem.model.AppointmentEntity;
import com.polsl.clinicservicesystem.model.AppointmentStatus;
import com.polsl.clinicservicesystem.model.PatientEntity;
import com.polsl.clinicservicesystem.model.UserEntity;
import com.polsl.clinicservicesystem.repository.AppointmentRepository;
import com.polsl.clinicservicesystem.repository.PatientRepository;
import com.polsl.clinicservicesystem.repository.UserRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
  private final AppointmentRepository appointmentRepository;
  private final UserRepository userRepository;
  private final PatientRepository patientRepository;

  public AppointmentService(AppointmentRepository appointmentRepository,
                            UserRepository userRepository,
                            PatientRepository patientRepository) {
    this.appointmentRepository = appointmentRepository;
    this.userRepository = userRepository;
    this.patientRepository = patientRepository;
  }

  public List<AppointmentResponse> getAppointmentsForDay(LocalDate date, Integer doctorId) {
    List<AppointmentResponse> appointments;
    if (doctorId == null) {
      appointments = appointmentRepository.findByAppointmentDate(date)
          .stream()
          .map(AppointmentResponse::fromEntity)
          .collect(Collectors.toList());
    } else {
      appointments = appointmentRepository.findByAppointmentDateAndDoctor_Id(date, doctorId)
          .stream()
          .map(AppointmentResponse::fromEntity)
          .collect(Collectors.toList());
    }
    return appointments;
  }

  public List<AppointmentFullResponse> getDoctorAppointmentsForDay(LocalDate date, Integer doctorId) {
    List<AppointmentFullResponse> appointments;
    appointments = appointmentRepository.findByAppointmentDateAndDoctor_Id(date, doctorId)
        .stream()
        .map(AppointmentFullResponse::fromEntity)
        .collect(Collectors.toList());
    return appointments;
  }


  public void cancelAppointment(Integer id) {
    AppointmentEntity appointment = appointmentRepository.findById(id)
        .orElseThrow(() -> new BadRequestException("Appointment with id: " + id + " was not found"));
    appointment.setStatus(AppointmentStatus.CANCELLED);
    appointmentRepository.save(appointment);
  }

  public void createAppointment(AppointmentRequest request) {
    UserEntity doctor = userRepository.findById(request.getDoctorId())
        .orElseThrow(() -> new BadRequestException("Doctor with id: " + request.getDoctorId() + " was not found"));

    PatientEntity patient = patientRepository.findById(request.getPatientId())
        .orElseThrow(() -> new BadRequestException("Patient with id: " + request.getPatientId() + " was not found"));

    AppointmentEntity appointment = new AppointmentEntity();
    appointment.setAppointmentTime(request.getAppointmentTime());
    appointment.setDoctor(doctor);
    appointment.setPatient(patient);
    appointment.setStatus(AppointmentStatus.SCHEDULED);
    appointmentRepository.save(appointment);
  }

  public AppointmentResponse getAppointment(Integer id) {
    AppointmentEntity appointment = appointmentRepository.findById(id)
        .orElseThrow(() -> new BadRequestException("Appointment with id: " + id + " was not found"));
    return AppointmentResponse.fromEntity(appointment);
  }

  public List<AppointmentFullResponse> getPatientAppointments(Integer id) {
    AppointmentEntity entity = appointmentRepository.findById(id)
        .orElseThrow(() -> new BadRequestException("Appointment with id: " + id + " was not found"));
    List<AppointmentFullResponse> appointments;
    appointments = appointmentRepository.findAllByAppointmentTimeBefore(entity.getAppointmentTime())
        .stream()
        .map(AppointmentFullResponse::fromEntity)
        .collect(Collectors.toList());
    return appointments;
  }

  public void makeAppointment(Integer id, MakeAppointmentRequest request) {
    AppointmentEntity entity = appointmentRepository.findById(id)
        .orElseThrow(() -> new BadRequestException("Appointment with id: " + id + " was not found"));

    entity.setDescription(request.getDescription());
    entity.setDiagnosis(request.getDiagnosis());
    entity.setStatus(AppointmentStatus.DONE);
    appointmentRepository.save(entity);
  }
}
