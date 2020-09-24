import React, { useState, Fragment } from "react";
import { 
	useSelector,
	useDispatch,
 } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "actions/AuthActions";

const Login = () => {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(store => store.auth.isAuthenticated)

	const [formData, setFormData] = useState({ username: "", password: "" });

	const { username } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login(formData))
	};

	return (
		<Fragment>
			{isAuthenticated ? (
				<Fragment>
					<Redirect to="/dashboard" />;
				</Fragment>
			) : (
				<form onSubmit={(e) => onSubmit(e)} className="login__form">
					<div className="form-group">
						<label htmlFor="usernameField" className="login__username-label">Username</label>
						<input
							name="username"
							type="text"
							className="login__username form-control"
							id="usernameField"
							placeholder="Enter Username"
							value={username}
							onChange={(e) => onChange(e)}
						/>
						<small className="login__subtext form-text text-muted">
							You can either choose to register or choose to be an avenger like "thor", "ironman", "hulk". Choose wisely.
						</small>
					</div>
					<button type="submit" className="login__submit btn btn-primary">
						Submit
					</button>
				</form>
			)}
		</Fragment>
	);
};

export default Login