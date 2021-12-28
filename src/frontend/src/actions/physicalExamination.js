import axios from "axios";

function addPhysicalTest(data) {
  return axios({
    method: "POST",
    url: "/api/physicalExamination/doctor",
    data,
  });
}

function getPatientPhysicalTests(id) {
  return axios({
    method: "GET",
    url: `/api/physicalExamination/doctor/patient/${id}`,
  })
}

export { addPhysicalTest, getPatientPhysicalTests };
