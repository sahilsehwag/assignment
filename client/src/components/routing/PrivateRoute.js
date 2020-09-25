import React from "react";
import {
	Route,
	Redirect
} from "react-router-dom";
import { 
	useSelector,
} from "react-redux";

const PrivateRoute = (props) => {
	const { component: Component, ...rest } = props;

	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
			}
		/>
	);
};

export default PrivateRoute
