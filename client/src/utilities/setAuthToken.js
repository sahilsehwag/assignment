import axios from "axios";

const setAuthToken = () => {
	if (localStorage.token)
		axios.defaults.headers.common["x-auth-token"] = localStorage.token;
	else delete axios.defaults.headers.common["x-auth-token"];
};

export default setAuthToken;
