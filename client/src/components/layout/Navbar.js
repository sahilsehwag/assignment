import React, {
	Fragment
} from "react";
import {
	Link,
	withRouter,
	useLocation,
} from "react-router-dom";
import {
	useSelector,
	useDispatch,
} from "react-redux";

import Loader from 'react-loader-spinner'

import { logout } from "actions/AuthActions";

const Navbar = ({ history }) => {
	const dispatch = useDispatch()

	const loading         = useSelector(state => state.comment.loading)
	const user            = useSelector(state => state.auth.user)
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const location = useLocation()

	const authLinks = (
		<Fragment>
			<Link to="#" className="nav-item nav-link" onClick={() => dispatch(logout(history))}>
				<i className="fas fa-sign-out-alt mr-1" />
				Logout
			</Link>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			{
				(location.pathname === '/login' || location.pathname === '/') &&
				<Link to="/register" className="nav-item nav-link">
					Register
				</Link>
			}
			{
				location.pathname === '/register' &&
				<Link to="/login" className="nav-item nav-link">
					Login
				</Link>
			}
		</Fragment>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow mb-4">
			<Loader 
				className="loader"
				type="TailSpin"
				color="#dc3545"
				height={100}
				width={100}
				visible={loading}
			/>
			<Link to="/" className="navbar-brand">
				<img
					src="https://www.rentomojo.com/public/images/logo.svg"
					height="30"
					className="d-inline-block align-top mr-2"
					alt=""
				/>
			</Link>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<div className="navbar-nav ml-auto">
					<span className="font-weight-light font-weight-italic p-2">
						{!loading && isAuthenticated ? ("Hello " + user.name) : "" }
					</span>
					{!loading && isAuthenticated ? authLinks : guestLinks}
				</div>
			</div>
		</nav>
	);
};


export default withRouter(Navbar)
