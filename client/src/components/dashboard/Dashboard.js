import React, {
	useState,
	useEffect
} from "react";
import { 
	useSelector,
	useDispatch,
} from "react-redux";

import Comment from "./Comment/Comment";
import {
	loadComments,
	addComment
} from "actions/CommentActions";

import { toast } from 'react-toastify'


const Dashboard = () => {
	const dispatch = useDispatch()

	const comments        = useSelector(state => state.comment.comments)
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const user            = useSelector(state => state.auth.user)
	const loading         = useSelector(state => state.auth.loading)

	const [text, setFormData] = useState("");
	const [page, setPage]     = useState(1);

	useEffect(() => {
		dispatch(loadComments(page))
	// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, [loadComments, page]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (text !== "")
			dispatch(addComment({ text }))
		else
			toast.error("Comment cannot be empty")
		setFormData("");
	};

	const renderComments = (comments, level=0, jsx=[]) => {
		if (comments === undefined || comments.length === 0)
			return jsx
		for (const comment of comments) {
			jsx.push(<Comment {...comment} userId={user._id} key={comment._id}/>)
			renderComments(comment.replies, level+1, jsx)
		}
		return jsx
	}


	if (isAuthenticated && !loading && user) {
		return (
			<div>
				<form className="mb-" onSubmit={onSubmit}>
					<div className="form-group">
						<textarea
							className="form-control"
							placeholder="Enter a comment..."
							name="text"
							cols="30"
							rows="5"
							value={text}
							onChange={(e) => setFormData(e.target.value)}
						/>
					</div>
					<button className="btn btn-danger" type="submit">
						Post Comment
					</button>
				</form>
				{renderComments(comments.filter(comment => comment.level === 0))}
			</div>
		);
	} else {
		return "";
	}
};

export default Dashboard