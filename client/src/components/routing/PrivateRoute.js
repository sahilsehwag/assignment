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
	const loading         = useSelector(state => state.auth.loading)

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />
			}
		/>
	);
};

export default PrivateRoute
