import axios from "axios";

function getLaboratoryTestStatuses() {
  return axios({
    method: "GET",
    url: "/api/laboratoryTestStatus",
  });
}

export { getLaboratoryTestStatuses };
