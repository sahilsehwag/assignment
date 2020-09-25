import React, { useState, Fragment } from "react";
import { 
	useSelector,
	useDispatch,
} from "react-redux";
import { Redirect } from "react-router-dom";

import { register } from "actions/AuthActions";

const Register = () => {
	const dispatch = useDispatch()

	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const [formData, setFormData] = useState({ name: "", username: "" });

	const { name, username } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(register(formData))
	};

	return (
		<Fragment>
			{isAuthenticated ? (
				<Fragment>
					<Redirect to="/dashboard" />
				</Fragment>
			) : (
				<form onSubmit={(e) => onSubmit(e)} className="register__form">
					<div className="form-group">
						<label htmlFor="nameField" className="register__name-label">Name</label>
						<input
							name="name"
							type="text"
							className="register__name form-control"
							id="nameField"
							placeholder="Name"
							value={name}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="usernameField" className="register__username-label">Username</label>
						<input
							name="username"
							type="text"
							className="register__username form-control"
							id="usernameField"
							placeholder="Enter Username"
							value={username}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<button type="submit" className="register__submit btn btn-primary">
						Submit
					</button>
				</form>
			)}
		</Fragment>
	);
};

export default Register