const jwt    = require("jsonwebtoken");
const config = require("config");

const UserModel = require("../models/User");

const auth = async (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).json({
			sucess: false,
			message: "No Token, Auhtorization Denied"
		});
	} else {
		try {
			// verifying if the token is valid or invalid
			const decodedData = await jwt.verify(token, config.get("jwtSecret"));
			req.user = decodedData.user;
			req.user = await UserModel.findById(req.user.id);

			// If user does not exist anymore
			if (!req.user) {
				return res.status(401).json({
					success: false,
					message: "User does not exist anymore"
				});
			}

			next();
		} catch (error) {
			res.locals.statusCode = 401;
			res.locals.message = "Your token is not valid";
			next(error);
		}
	}
};

module.exports = { auth };
