const otpGenerator = require("otp-generator");
const { mailSender } = require("../utils/mailSender");
const UserOTP = require("../models/emailOtp");
const User = require("../models/registerdUser");


// Function to handle missing data
const handleMissingData = (res) => {
    return res.json({
        success: false,
        message: "Missing some data."
    });
}

// Function to handle OTP verification
const handleOtpVerification = async (res, userotp, otp) => {
    if(userotp.otp === otp){
        await UserOTP.findByIdAndDelete(userotp._id);
        let user = await User.findOne({ email: userotp.email });

        if(user){
            return res.json({
                success: true,
                message: "OTP verified Successfully",
                role: user.role,
                profile: user.profile,
            });
        }
        else{
            user = await User.create({
                email: userotp.email
            });

            return res.json({
                success: true,
                message: "OTP verified Successfully",
                profile: user.profile,
            });
        }
    }
    else{
        return res.json({
            success: false,
            message: "Wrong OTP"
        });
    }
}

// Function to handle expired OTP
const handleExpiredOtp = (res) => {
    return res.json({
        success: false,
        message: "OTP Expired, Re-send OTP again"
    });
}

// Main function to handle OTP verification
exports.handleVerifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if(!email || !otp){
        return handleMissingData(res);
    }

    try {
        let userotp = await UserOTP.findOne({ email });

        if (userotp) {
            return await handleOtpVerification(res, userotp, otp);
        }
        else {
            return handleExpiredOtp(res);
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.handleSendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Missing some data."
        });
    }

    try {
        let emailOtp = await UserOTP.findOne({ email });

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        if (!emailOtp) {
            
            const userOtpPayload = {
                email,
                otp,
            };

            emailOtp = await UserOTP.create(userOtpPayload);
        } else {
            await UserOTP.findByIdAndUpdate(emailOtp._id, { $set: { createdAt: Date.now(), otp: otp } }, { new: true });
        }

        const info = await mailSender(
            email, 
            "Email Verification", 
            `Your One-Time Password for login/register is OTP: <b>${otp}</b> </br> <p>Only Valid for 5 Minutes.</p>`);

        await UserOTP.findByIdAndUpdate(emailOtp._id, { $set: { messageId: info.messageId } });

        return res.json({
            success: true,
            message: "OTP send successfully"
        });


    } catch (error) {
        return res.json({
            success: false,
            message: "Unable to send OTP. Try again.",
            error: error.message,
        });
    }
};