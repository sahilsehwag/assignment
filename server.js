const express = require("express");
const app = express();

require("./config/db")();
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/comment", require("./routes/comment"));

app.use(async (err, req, res, next) => {
	console.log(err);
	const { status, message } = res.locals;
	res.status(status).json({ success: false, message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'))
}
