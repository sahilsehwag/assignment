import { combineReducers } from "redux";

import auth from "./AuthReducer";
import comment from "./CommentReducer";

export default combineReducers({
	auth,
	comment
});
