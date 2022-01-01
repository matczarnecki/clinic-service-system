import axios from "axios";

function addLaboratoryTest(data) {
  return axios({
    method: "POST",
    url: "/api/laboratoryTest/doctor",
    data,
  });
}

function getPatientLaboratoryTests(id) {
  return axios({
    method: "GET",
    url: `/api/laboratoryTest/doctor/patient/${id}`,
  });
}

function getLaboratoryTests(status) {
  return axios({
    method: "GET",
    url: "/api/laboratoryTest",
    params: {
      status,
    },
  });
}

function assistantMakeTest(id, data) {
  return axios({
    method: "PATCH",
    url: `/api/laboratoryTest/laboratoryAssistant/make/${id}`,
    data,
  });
}

function assistantCancelTest(id, data) {
  return axios({
    method: "PATCH",
    url: `/api/laboratoryTest/laboratoryAssistant/cancel/${id}`,
    data,
  });
}

function supervisorAcceptTest(id, data) {
  return axios({
    method: "PATCH",
    url: `/api/laboratoryTest/laboratorySupervisor/accept/${id}`,
    data,
  });
}

function supervisorCancelTest(id, data) {
  return axios({
    method: "PATCH",
    url: `/api/laboratoryTest/laboratorySupervisor/cancel/${id}`,
    data,
  });
}

export {
  addLaboratoryTest,
  getPatientLaboratoryTests,
  getLaboratoryTests,
  assistantMakeTest,
  assistantCancelTest,
  supervisorAcceptTest,
  supervisorCancelTest,
};
