import axios from "axios";

function getAppointments(date, statusCode) {
  return axios({
    method: "GET",
    url: "/api/appointment/doctor",
    params: {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      statusCode,
    }
  });
}

function getDoctors() {
  return axios({
    method: "GET",
    url: '/api/doctor/registrant',
  });
}

export { getAppointments, getDoctors };
