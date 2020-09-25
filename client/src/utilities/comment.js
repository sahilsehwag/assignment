export const updateComment = (comments, newComment) => {
	if (comments.length === 0)
		return comments
	return comments.map(oldComment => {
		if (oldComment._id === newComment._id)
			return newComment
		else
			oldComment.replies = updateComment(oldComment.replies, newComment)
			return oldComment
	})
}


export const addReply = (comments, reply, parentId) => {
	if (comments.length === 0)
		return comments
	return comments.map(comment => {
		if (comment._id === parentId) {
			comment.replies = [...comment.replies, reply]
		} else {
			comment.replies = addReply(comment.replies, reply, parentId)
		}
		return comment
	})
}

export const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)
