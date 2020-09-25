import React, {
	Fragment,
	useEffect,
} from "react";

import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";

import {
	useSelector,
	useDispatch,
} from 'react-redux'

import PrivateRoute from "./components/routing/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner'

import { loadUser } from "./actions/AuthActions";
import setAuthToken from "utilities/setAuthToken";


const App = () => {
	const dispatch = useDispatch()
	const loading = useSelector(state => state.comment.loading)

	useEffect(() => {
		setAuthToken();
		dispatch(loadUser());
	}, []);

	return (
		<Fragment>
			<Loader 
				className="loader"
				type="TailSpin"
				color="#dc3545"
				height={100}
				width={100}
				visible={loading}
			/>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
			/>
			<Router>
				<Fragment>
					<Navbar />
					<section className="container shadow rounded bg-white p-5">
						<Switch>
							<Route exact path="/" component={Login} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Fragment>
	);
};

export default App;
