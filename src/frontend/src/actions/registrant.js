import axios from "axios";

function getAppointments(date, doctor) {
  date.setUTCHours(0,0,0,0);
  const isoDate = date.toISOString().substring(0,10);
  return axios({
    method: "GET",
    url: "/v1/api/appointments",
    params: {
      date: isoDate,
      doctor,
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

export { getAppointments, addAppointment};
