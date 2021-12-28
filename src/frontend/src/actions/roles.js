import axios from "axios";

function getRoles() {
  return axios({
    method: "GET",
    url: '/v1/api/roles',
  });
}

export { getRoles };