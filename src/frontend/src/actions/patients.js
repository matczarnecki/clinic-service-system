import axios from "axios";

function getPatients() {
  return axios({
    method: "GET",
    url: '/v1/api/patients',
  });
}

function addPatient(data) {
  return axios({
    method: "POST",
    url: '/v1/api/patients/',
    data,
  })
}

export { getPatients, addPatient };
