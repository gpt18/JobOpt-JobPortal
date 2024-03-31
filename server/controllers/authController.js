const otpGenerator = require("otp-generator");
const { mailSender } = require("../utils/mailSender");
const UserOTP = require("../models/emailOtp");
const User = require("../models/registerdUser");
const { getJwtToken } = require("../helper/auth");


// Function to handle missing data
const handleMissingData = (res) => {
    return res.json({
        success: false,
        message: "Missing some data."
    });
}
// Function to handle OTP verification
const handleOtpVerification = async (res, userotp, otp) => {
    if (userotp.otp !== otp) {
        return res.json({
            success: false,
            message: "Wrong OTP"
        });
    }

    await UserOTP.findByIdAndDelete(userotp._id);
    let user = await User.findOne({ email: userotp.email }) || await User.create({ email: userotp.email });

    let token;
    if(user.role){
        token = getJwtToken({ email: user.email, role: user.role });
        res.cookie('__sessionid', token, { httpOnly: true, secure: true, SameSite: 'none', maxAge: 3600000 });
    }

    return res.json({
        success: true,
        message: user.role ? "OTP verified Successfully! Role already Selected." : "OTP verified Successfully! Proceed with the registration.",
        role: user.role,
        token,
        profile: user.profile,
    });
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

    if (!email || !otp) {
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
            "Email Verification - OTP",
            `<p>Dear User ${email},</p>

            <p>We received a request for a One-Time Password (OTP) from your account. Your OTP is: <b>${otp}</b></p>

            <p>Please note, this OTP is valid for 5 minutes only. If you did not make this request, please ignore this email or contact our support team immediately.</p>

            <p>Thank you for using our services!</p>

            <p>Best Regards,</p>
            <p>G. Prajapati</p>
            <p>(anchors.in assignment)</p>`);

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