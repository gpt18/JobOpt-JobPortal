const mongoose= require("mongoose")

const otpSchema = new mongoose.Schema({
    email: {
		type: String,
		required: true,
		unique: true,
	},
	otp: {
		type: String,
		required: true,
	},
    messageId: {
        type: String,
    },
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5,
	},
});

const UserOTP = mongoose.model("OTP", otpSchema);

module.exports = UserOTP