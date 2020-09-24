const express = require("express");
const jwt     = require("jsonwebtoken");
const config  = require("config");
const router  = express.Router();

const UserModel = require("../models/User");
const { auth }  = require("../middleware/auth");

// fetch user
router.get("/", auth, async (req, res, next) => {
	res.json({
		success: true,
		message: "Successfull User",
		user: req.user
	});
});

// /login
router.post("/", async (req, res, next) => {
	try {
		const { username } = req.body;
		const user = await UserModel.findOne({ username });

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Username does not exist"
			});
		}

		const payload = { user: { id: user.id } };
		jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			return res.json({ success: true, message: "Successfully Loggedin", user, token });
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/login'";
		next(error);
	}
});

// /register
router.post("/register", async (req, res, next) => {
	try {
		const { name, username } = req.body;
		const user = await UserModel.findOne({ username });

		if (user) {
			return res.status(400).json({
				success: false,
				message: "User already registered"
			});
		}

		const newUser = new UserModel({ name, username });
		await newUser.save();
		const payload = { user: { id: newUser.id } };

		jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			return res.json({
				success: true,
				message: "User Registered",
				user: newUser,
				token
			});
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/register'";
		next(error);
	}
});

module.exports = router;
