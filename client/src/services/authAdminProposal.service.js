import axios from "axios";
const API_URL = "http://localhost:8000/proposal/";

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    },
    {withCredentials: true})
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  return axios.get(API_URL + "logout", {withCredentials: true})
  	.then((response) => {
  		return response.data;
  	});
};

const whoami = () => {
  return axios.get(API_URL + "whoami", {withCredentials: true})
	.then((response) => {
		return response.data;
	});
}

// eslint-disable-next-line
export default {
  login,
  logout,
  whoami,
};
