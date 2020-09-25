import axios from "axios";

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
	SET_LAST_ADDED_COMMENT,
} from "./types";

import { toast } from 'react-toastify'


export const loadComments = (page=1) => {
	return async (dispatch) => {
		try {
			const {
				data: { comments }
			} = await axios.get("/comment", { params: { page } });

			dispatch({ type: GET_COMMENTS, payload: comments.filter(comment => comment.level === 0) });
		} catch (error) {
			dispatch({ type: CLEAR_COMMENTS });
			toast.error(error.message)
		}
	};
};


export const addComment = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { comment }
			} = await axios.post("/comment", formData)

			dispatch({ type: ADD_COMMENT, payload: comment })
			dispatch(setLastAddedComment(comment._id))
			toast.success("Comment posted")
		} catch (error) {
			loadComments()
			toast.error(error.message)
		}
	};
};


export const addReply = (parentId, parentLevel) => {
	return async (dispatch) => {
		try {
			const {
				data: { reply }
			} = await axios.post("/comment/reply", { parentId, parentLevel });

			dispatch({ type: ADD_REPLY, payload: { parentId, reply } });
			dispatch({ type: SET_ACTIVE_REPLY_ID, payload: { activeReplyID: reply._id } });
		} catch (error) {
			// dispatch({ type: CLEAR_COMMENTS });
			loadComments()
			toast.error(error.message)
		}
	};
};


export const setActiveReplyID = id => {
	return { type: SET_ACTIVE_REPLY_ID, payload: { activeReplyID: id }}
}


export const updateComment = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { comment }
			} = await axios.put("/comment", formData);

			const { upVote, downVote, removeUpVote, removeDownVote, text } = formData;

			const payload = { comment }
			if (upVote) {
				dispatch({ type: UP_VOTE_COMMENT, payload });
			} else if (removeUpVote) {
				dispatch({ type: REMOVE_UP_VOTE_COMMENT, payload });
			} else if (downVote) {
				dispatch({ type: DOWN_VOTE_COMMENT, payload });
			} else if (removeDownVote) {
				dispatch({ type: REMOVE_DOWN_VOTE_COMMENT, payload });
			} else if (text) {
				dispatch({ type: UPDATE_COMMENT_TEXT, payload });
				toast.success("Comment updated")
			}
		} catch (error) {
			// dispatch({ type: CLEAR_COMMENTS });
			loadComments()
			toast.error(error.message)
		}
	};
}


export const setLastAddedComment = id => ({
	type: SET_LAST_ADDED_COMMENT,
	payload: { lastAddedComment: id }
})