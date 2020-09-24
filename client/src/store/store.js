import {
	createStore,
	applyMiddleware
} from "redux";
import {
	composeWithDevTools
} from "redux-devtools-extension";

import thunk from "redux-thunk";
import logger from "redux-logger";

import {
	startLoader,
	endLoader,
} from 'middlewares/index'

import rootReducer from "reducers";

const middlewares = [startLoader, thunk, logger, endLoader];
const store = createStore(
	rootReducer,
	{},
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
