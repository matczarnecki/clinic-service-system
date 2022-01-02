import axios from "axios";

function getAppointment(id) {
  return axios({
    method: "GET",
    url: `/api/appointment/doctor/appointment/${id}`,
  });
}

function makeAppointment(data, id) {
  return axios({
    method: "PATCH",
    url: `/api/appointment/doctor/appointment/${id}`,
    data,
  });
}

function getPatientAppointments(id) {
  return axios({
    method: "GET",
    url: `/api/appointment/doctor/patient/${id}`,
  });
}

function cancelAppointment(appointmentId){
  return axios({
    method: "DELETE",
    url: `/v1/api/appointments/${appointmentId}`,
  })
}

export { getAppointment, makeAppointment, getPatientAppointments, cancelAppointment };
