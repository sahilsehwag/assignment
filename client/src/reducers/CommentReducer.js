import {
	GET_COMMENTS,
	ADD_COMMENT,
	CLEAR_COMMENTS,
	UP_VOTE_COMMENT,
	DOWN_VOTE_COMMENT,
	REMOVE_UP_VOTE_COMMENT,
	REMOVE_DOWN_VOTE_COMMENT,
	UPDATE_COMMENT_TEXT,
	ADD_REPLY,
	SET_ACTIVE_REPLY_ID,
	SET_LOADING,
	SET_LAST_ADDED_COMMENT,
} from "actions/types";

import {
	updateComment,
	addReply
} from "utilities/comment";

const initialState = {
	comments: [],
	loading: false,
	activeReplyID: null,
	lastAddedComment: null,
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_COMMENTS:
			return {
				...state,
				comments: payload,
				loading: false,
			};
		case ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, payload],
				loading: false,
			};
		case UP_VOTE_COMMENT:
		case DOWN_VOTE_COMMENT:
		case REMOVE_UP_VOTE_COMMENT:
		case REMOVE_DOWN_VOTE_COMMENT:
			return {
				...state,
				comments: updateComment(state.comments, payload.comment),
				loading: false
			};
		case UPDATE_COMMENT_TEXT:
			return {
				...state,
				comments: updateComment(state.comments, payload.comment),
				loading: false,
			};
		case ADD_REPLY:
			return {
				...state,
				comments: addReply(state.comments, payload.reply, payload.parentId),
				loading: false
			};
		case CLEAR_COMMENTS:
			return {
				...state,
				comments: [],
				loading: false
			};
		case SET_ACTIVE_REPLY_ID:
		case SET_LOADING:
		case SET_LAST_ADDED_COMMENT:
			return {
				...state,
				...payload,
			}
		default:
			return state;
	}
}
