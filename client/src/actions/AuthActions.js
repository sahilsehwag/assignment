import axios from "axios";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT
} from "./types";
import { toast } from "react-toastify";

// Load User
export const loadUser = () => {
	return async (dispatch) => {
		try {
			const {
				data: { user }
			} = await axios.get("/auth");

			dispatch({ type: USER_LOADED, payload: user });
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};
};

export const login = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { user, token }
			} = await axios.post("/auth", formData);

			dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
			toast.success("Login successful")
		} catch (error) {
			dispatch({ type: LOGIN_FAIL });
			// toast.error(error.response.data.message)
			toast.error(error)
		}
	};
};

export const logout = (history) => {
	return async (dispatch) => {
		dispatch({ type: LOGOUT });
		toast.success("You're logged out", "success")
		history.push("/");
	};
};

export const register = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { user, token }
			} = await axios.post("/auth/register", formData);

			dispatch({ type: REGISTER_SUCCESS, payload: { user, token } });
			toast.success("Registration successful")
		} catch (error) {
			dispatch({ type: REGISTER_FAIL });
			toast.error(error.response.data.message)
		}
	};
};
