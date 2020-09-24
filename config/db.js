const mongoose = require("mongoose");

const mongoURI = process.env.mongoURI

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log("MongoDB Connected");
	} catch (err) {
		console.log(err.message);
		// exit proccess with failiure
		process.exit(1);
	}
};

module.exports = connectDB;
