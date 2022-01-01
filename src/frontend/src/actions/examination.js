import axios from "axios";

function getExaminations(type) {
  return axios({
    method: "GET",
    url: "/api/examination/doctor",
    params: {
      type,
    },
  });
}

export { getExaminations };
