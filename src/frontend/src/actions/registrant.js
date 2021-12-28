import axios from "axios";

function getAppointments(date) {
  return axios({
    method: "GET",
    url: "api/appointment/registrant",
    params: {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }
  });
}

function addAppointment(data) {
  return axios({
    method: "POST",
    url: "api/appointment/registrant",
    data: data,
  });
}

export { getAppointments, addAppointment};
