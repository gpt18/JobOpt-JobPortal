const Company = require("../models/company");
const User = require("../models/registerdUser");

const INITIAL_BALANCE_COMPANY = 200;
const ROLE_ALREADY_SELECTED_MESSAGE = "Role already selected";
const USER_NOT_FOUND_MESSAGE = "User not found. Login again for new registration.";
const INCOMPLETE_DATA_MESSAGE = "Incomplete data provided.";

// Company Reward price
const COMPANY_NAME_REWARD = 25;
const WEBSITE_LINK_REWARD = 50;
const COMPANY_SIZE_REWARD = 20;
const COMPANY_LOGO_REWARD = 50;


exports.handleCreateCompanyProfile = async (req, res) => {
    const { companyName, websiteLink, companySize, companyLogo, email } = req.body;


    if (!email || !companyName) {
        return res.json({
            success: false,
            message: "Missing data. Please provide the company name and email.",
        });
    }

    let company;
    try {
        company = await Company.findOne({ email });
    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid Request",
            error: error.message
        });
    }

    if (!company) {
        return res.json({
            success: false,
            message: "Company not found",
        });
    }

    let reward = 0;

    if (companyName) {
        if (!company.companyName) {
            reward += COMPANY_NAME_REWARD;
            company.accountHistory.push({
                amount: COMPANY_NAME_REWARD,
                type: "credit",
                date: new Date(),
                reason: "Reward has been given for providing the company name."
            });
        }
        company.companyName = companyName;

    }

    if (websiteLink) {
        if (!company.websiteLink) {
            reward += WEBSITE_LINK_REWARD
            company.accountHistory.push({
                amount: WEBSITE_LINK_REWARD,
                type: "credit",
                date: new Date(),
                reason: "Reward has been given for providing the website link."
            });
        }
        company.websiteLink = websiteLink;
    }

    if (companySize) {
        if (!company.companySize) {
            reward += COMPANY_SIZE_REWARD
            company.accountHistory.push({
                amount: COMPANY_SIZE_REWARD,
                type: "credit",
                date: new Date(),
                reason: "Reward has been given for providing the company size."
            });
        }
        company.companySize = companySize;

    }

    if (companyLogo) {
        if (!company.companyLogo) {
            reward += COMPANY_LOGO_REWARD
            company.accountHistory.push({
                amount: COMPANY_LOGO_REWARD,
                type: "credit",
                date: new Date(),
                reason: "Reward has been given for uploading the company logo."
            });
        }
        company.companyLogo = companyLogo;

    }

    company.balance += reward;

    try {
        await User.findOneAndUpdate({ email }, { profile: true });
        company.save();
    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid Request",
            error: error.message
        });
    }

    return res.json({
        success: true,
        message: "Company Profile Updated Successfully",
        reward,
    });
}

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
            return res.json({
                success: true,
                message: "Role already selected. You can't change the role once selected.",
                role: user.role,
                profile: user.profile,
            });
        }

        user.role = role;
        await user.save();

        if (role === "company") {
            const company = await Company.findOne({ email });
            if (company) {
                return res.json({
                    success: true,
                    message: `Email already registered.`,
                    cid: company._id,
                    role: user.role,
                    profile: user.profile,
                });
            }
            const newCompany = await Company.create({ email: user.email, balance: INITIAL_BALANCE_COMPANY });

            newCompany.accountHistory.push({
                amount: INITIAL_BALANCE_COMPANY,
                type: "credit",
                date: new Date(),
                reason: "Reward for registration."
            });

            newCompany.save();

            return res.json({
                success: true,
                message: `Role selected successfully. You earn Rs. ${INITIAL_BALANCE_COMPANY} as a registration reward.`,
                cid: newCompany._id,
                role: user.role,
                profile: user.profile,
            });

        }

        return res.json({
            success: false,
            message: "Invalid role selected",
        });
    } catch (error) {
        console.error(error);
        return sendResponse(res, false, "An error occurred.");
    }
};