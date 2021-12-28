import axios from "axios";

function getPatients() {
  return axios({
    method: "GET",
    url: '/api/patient/registrant',
  });
}

function addPatient(data) {
  return axios({
    method: "POST",
    url: '/api/patient/registrant',
    data,
  })
}

export { getPatients, addPatient };
