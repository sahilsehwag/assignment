const express = require("express");
const router = express.Router();

const CommentModel = require("../models/Comment");
const { auth } = require("../middleware/auth");

const populationQuery = ([
	{ path: "user" },
	{
		path: "replies",
		populate: [
			{ path: "user" },
			{
				path: "replies",
				populate: [
					{ path: "user" },
					{ path: "replies" },
				],
			},
		],
	},
])


router.get("/", async (req, res, next) => {
	try {
		const page = req.query.page;
		const comments = await CommentModel.find(
			{},
			{ __v: false },
			// { skip: (page - 1) * 100, limit: 100 }
		)
			.populate(populationQuery)
			// .sort({ downVotes: 1 });

		res.json({
			success: true,
			message: "Comments Fetched",
			comments
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/'";
		next(error);
	}
});


router.post("/", auth, async (req, res, next) => {
	try {
		const { text } = req.body;
		const user = req.user.id;

		let comment = new CommentModel({ text, user });
		await comment.save();

		comment = await (CommentModel
			.findById(comment.id)
			.populate(populationQuery)
		)

		res.json({
			success: true,
			message: "Comment Added",
			comment
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/'";
		next(error);
	}
});


router.post("/reply", auth, async (req, res, next) => {
	try {
		const text = ""
		const user = req.user.id;

		const parentId = req.body.parentId;
		const level = req.body.parentLevel + 1;

		const child = new CommentModel({ text, user, level });
		await child.save();

		const reply = await (await CommentModel
			.findById(child.id)
			.populate(populationQuery)
		)

		await CommentModel.findByIdAndUpdate(parentId, {
			$push: { replies: reply }
		})

		res.json({
			success: true,
			message: "Reply Added",
			reply,
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/'";
		next(error);
	}
});


router.put("/", auth, async (req, res, next) => {
	try {
		const { commentId, upVote, downVote, removeUpVote, removeDownVote, text } = req.body;
		const userId = req.user.id;

		if (upVote) {
			await CommentModel.findByIdAndUpdate(commentId, {
				$addToSet: { upVotes: userId },
				$pull: { downVotes: userId }
			});
		} else if (downVote) {
			await CommentModel.findByIdAndUpdate(commentId, {
				$addToSet: { downVotes: userId },
				$pull: { upVotes: userId }
			});
		} else if (removeUpVote) {
			await CommentModel.findByIdAndUpdate(commentId, {
				$pull: { upVotes: userId }
			});
		} else if (removeDownVote) {
			await CommentModel.findByIdAndUpdate(commentId, {
				$pull: { downVotes: userId }
			});
		} else if (text) {
			await CommentModel.findByIdAndUpdate(commentId, {
				text: text,
			});
		}

		const comment = await (CommentModel
			.findById(commentId)
			.populate(populationQuery)
		)
		res.json({
			success: true,
			message: "Comment Updated",
			comment
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at PUT '/'";
		next(error);
	}
});


module.exports = router;
