const jwt = require("jsonwebtoken")

const signUser = async payload => {
	return await jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 })
}

module.exports = { signUser }