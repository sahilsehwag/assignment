import React, {
	useState,
	useEffect,
	useRef,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	updateComment,
	addReply,
	setActiveReplyID,
	setLastAddedComment,
} from "actions/CommentActions";
import './Comment.scss'

import {
	scrollToRef,
} from 'utilities/comment'

import { toast } from 'react-toastify'

const Comment = ({ _id, text, user, upVotes, downVotes, date, userId, level }) => {
	const [vote, setVote] = useState({ up: false, down: false })
	const { up, down }    = vote;

	const [editing, setEditing]         = useState(false)
	const [editingText, setEditingText] = useState("")

	const authenticatedUser = useSelector(store => store.auth.user)
	const activeReplyID     = useSelector(store => store.comment.activeReplyID)
	const lastAddedComment  = useSelector(store => store.comment.lastAddedComment)

	const dispatch = useDispatch()

	const commentRef  = useRef(null)
	const textareaRef = useRef(null)


	useEffect(() => {
		const newUpVotes = upVotes.filter((id) => id === userId);
		if (newUpVotes.length > 0) setVote({ up: true, down: false })
	}, [upVotes, userId]);


	useEffect(() => {
		const newDownVotes = downVotes.filter((id) => id === userId);
		if (newDownVotes.length > 0) setVote({ down: true, up: false })
	}, [downVotes, userId]);


	useEffect(() => {
		if (activeReplyID === _id) {
			scrollToRef(commentRef)
			textareaRef.current.focus()
		}
		if (lastAddedComment === _id) {
			scrollToRef(commentRef)
			dispatch(setLastAddedComment(null))
		}
		if (editing) {
			textareaRef.current.focus()
			textareaRef.current.select()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, [activeReplyID, lastAddedComment, _id, editing])


	const onUpVote = e => {
		e.preventDefault();
		if (!up) {
			dispatch(updateComment({ commentId: _id, upVote: true }))
			setVote({ up: true, down: false });
		}
		if (up) {
			dispatch(updateComment({ commentId: _id, removeUpVote: true }))
			setVote({ up: false, down: false });
		}
	};

	const onDownVote = e => {
		e.preventDefault();
		if (!down) {
			dispatch(updateComment({ commentId: _id, downVote: true }))
			setVote({ down: true, up: false });
		}
		if (down) {
			dispatch(updateComment({ commentId: _id, removeDownVote: true }))
			setVote({ down: false, up: false });
		}
	};

	const editComment = e => {
		setEditing(true)
		setEditingText(text)
	}

	const saveComment = e => {
		if (editingText !== "") {
			setEditing(false)
			if (activeReplyID === _id)
				dispatch(setActiveReplyID(null))
			dispatch(updateComment({ commentId: _id, text: editingText}))
		} else {
			toast.error("Comment cannot empty")
		}
	}

	const replyToComment = e => {
		if (isEditing())
			toast.error("Please finish editing the existing comment")
		else
			dispatch(addReply(_id, level))
	}

	const isEditing = () => {
		return (
			editing ||
			activeReplyID === _id
		)
	}


	return (
		<div
			className="comment"
			style={{ marginLeft: ((level * 10)).toString() + "%" }}
			ref={commentRef}
		>
			<div className="comment__header">
				<div className="comment__username">
					<span className="comment__username-text bg-light text-dark rounded">
						{user.name}
					</span>
				</div>
				<div className="comment__time">
					<span className="comment__time-text bg-light text-dark rounded">
						{new Date(date).toLocaleString()}
					</span>
				</div>
			</div>

			<div className="comment__content shadow-sm bg-light" key={_id}>
				{
					!isEditing() &&
					<span className="comment__text">
						{text}
					</span>
				}
				{
					isEditing() &&
					<textarea
						className="comment__text"
						value={editingText}
						onChange={e => setEditingText(e.target.value)}
						ref={textareaRef}
					/>
				}
			</div>

			<div className="comment__buttons">
				{
					level < 2 && 
					<div
						className="comment__reply-button btn btn-secondary text-light"
						onClick={replyToComment}
					>
						Reply
					</div>}
				{
					!isEditing() && authenticatedUser.name === user.name &&
					(<div
						className="comment__edit-button btn btn-danger text-light"
						onClick={editComment}
					>
						Edit
					</div>)
				}
				{
					isEditing() &&
					(<div
						className="comment__save-button btn btn-danger text-light"
						onClick={saveComment}
					>
						Save
					</div>)
				}

				<div className="comment__upvote-button" onClick={onUpVote}>
					<span
						className="comment__upvote-icon fas fa-thumbs-up fa-1x"
						style={{ color: up ? "#49fb00" : "grey" }}
					>
					</span>
					<span>{upVotes.length}</span>
				</div>
				<div className="comment__downvote-button" onClick={onDownVote}>
					<span
						className="comment__downvote-icon fas fa-thumbs-down fa-1x"
						style={{ color: down ? "red" : "grey" }}
					></span>
					<span>{downVotes.length}</span>
				</div>
			</div>
		</div>
	);
};


export default Comment