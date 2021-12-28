import axios from 'axios';

function login(data) {
    return axios({
      method: "POST",
      url: "/v1/api/authentication",
      data: data,
    }).then(res => {
      console.log(res)
      const token = res.data.jwt;
      localStorage.setItem('Token', token);
      setAuthorizationToken(token);
    })
}

function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

function logout() {
  localStorage.removeItem('Token');
}
export { login, setAuthorizationToken, logout };
