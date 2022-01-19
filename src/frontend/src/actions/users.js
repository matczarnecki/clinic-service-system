import axios from "axios";

function getUsers() {
  return axios({
    method: "GET",
    url: "/v1/api/users",
  });
}

function getLoggedUserData() {
  return axios({
    method: "GET",
    url: "/v1/api/users/me"
  });
}

function addUser(data) {
  return axios({
    method: "POST",
    url: "/v1/api/users/registration",
    data,
  });
}

function deactivateUser(id) {
  return axios({
    method: "DELETE",
    url: `/v1/api/users/${id}`,
  });
}

function getUser(id) {
  return axios({
    method: "GET",
    url: `/v1/api/users/${id}`,
  });
}

function editUser(id, data) {
  return axios({
    method: "PATCH",
    url: `/v1/api/users/${id}`,
    data,
  });
}

function getDoctors() {
  return axios({
    method: "GET",
    url: 'v1/api/users/doctors',
  });
}

function unlockUser(id) {
  return axios({
    method: "PATCH",
    url: `v1/api/users/${id}/unlock`,
  })
}

export {
  getUsers,
  getLoggedUserData,
  addUser,
  deactivateUser,
  getUser,
  editUser,
  getDoctors,
  unlockUser,
}
