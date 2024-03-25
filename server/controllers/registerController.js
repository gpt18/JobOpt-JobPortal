const Company = require("../models/company");
const User = require("../models/registerdUser");

const INITIAL_BALANCE = 200;
const ROLE_ALREADY_SELECTED_MESSAGE = "Role already selected";
const USER_NOT_FOUND_MESSAGE = "User not found. Login again for new registration.";
const INCOMPLETE_DATA_MESSAGE = "Incomplete data provided.";

const sendResponse = (res, success, message, cid) => {
    const response = { success, message };
    if (cid) {
        response.cid = cid;
    }
    return res.json(response);
}

exports.handleSelectRole = async (req, res) => {
    const { email, role } = req.body;

    if (!email || !role) {
        return sendResponse(res, false, INCOMPLETE_DATA_MESSAGE);
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return sendResponse(res, false, USER_NOT_FOUND_MESSAGE);
        }

        if (user.role) {
            const company = await Company.findOne({email: user.email});
            return sendResponse(res, false, ROLE_ALREADY_SELECTED_MESSAGE, company._id);
        }

        user.role = role;
        await user.save();

        const newCompany = await Company.create({email: user.email, balance: INITIAL_BALANCE});

        return sendResponse(res, true, `You earn Rs. ${INITIAL_BALANCE} as a registration reward.`, newCompany._id);
    } catch (error) {
        console.error(error);
        return sendResponse(res, false, "An error occurred.");
    }
};