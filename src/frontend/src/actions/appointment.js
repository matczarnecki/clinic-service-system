import axios from "axios";

function getAppointment(id) {
  return axios({
    method: "GET",
    url: `/v1/api/appointments/${id}`,
  });
}

function makeAppointment(data, id) {
  return axios({
    method: "PATCH",
    url: `/v1/api/appointments/${id}`,
    data,
  });
}

function getPatientAppointments(id) {
  return axios({
    method: "GET",
    url: `/v1/api/appointments/patient/${id}`,
  });
}

function cancelAppointment(appointmentId) {
  return axios({
    method: "DELETE",
    url: `/v1/api/appointments/${appointmentId}`,
  })
}

function getAppointments(date, doctor) {
  let newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  const isoDate = newDate.toISOString().substring(0, 10);
  return axios({
    method: "GET",
    url: "/v1/api/appointments",
    params: {
      date: isoDate,
      doctor,
    }
  });
}

function getDoctorAppointments(date) {
  date.setUTCHours(0, 0, 0, 0);
  const isoDate = date.toISOString().substring(0, 10);
  return axios({
    method: "GET",
    url: "/v1/api/appointments/doctor",
    params: {
      date: isoDate,
    }
  });
}

function addAppointment(data) {
  return axios({
    method: "POST",
    url: "/v1/api/appointments",
    data
  });
}

export {
  getAppointment,
  makeAppointment,
  getPatientAppointments,
  cancelAppointment,
  getAppointments,
  addAppointment,
  getDoctorAppointments
};
