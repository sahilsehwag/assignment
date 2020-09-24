const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const CommentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	text: {
		type: String,
		// required: true,
		default: "",
	},
	upVotes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	],
	downVotes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	],
	date: {
		type: Date,
		default: Date.now
	},
	level: {
		type: Number,
		default: 0,
	},
	replies: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		}
	],
});

module.exports = mongoose.model("Comment", CommentSchema);
