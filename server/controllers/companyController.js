const Company = require("../models/company");
const JobPost = require("../models/jobPost");
const { mailSender } = require("../utils/mailSender");
const User = require("../models/registerdUser");

exports.handleGetCompanyBalance = async (req, res) => {

    const cid = req.params.id;

    if (!cid) return res.json({
        success: false,
        message: "Data missing",
    });

    try {
        const { balance } = await Company.findById(cid);

        return res.json({
            cid,
            success: true,
            message: "Fetched Company Account Balance",
            balance
        });

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request"})
    }


}

exports.handleGetCompanyProfile = async (req, res) => {
    const email = req.params.email;

    if (!email) return res.json({
        success: false,
        message: "Incomplete data provided. Please provide email address to fetch company profile.",
    });

    try {
        const company = await Company.findOne({email});
        const user = await User.findOne({email});

        return res.json({
            cid: company._id,
            email: company.email,
            balance: company.balance,
            name: company.companyName,
            website: company.websiteLink,
            size: company.companySize, 
            logo: company.companyLogo,
            profile: user.profile,
            success: true,
            message: "Company Profile fetched successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request", error: error.message})
    }
}

exports.handleGetCompanyTransactions = async (req, res) => {
    const cid = req.params.id;

    if (!cid) return res.json({
        success: false,
        message: "Data missing",
    });

    try {
        const { accountHistory } = await Company.findById(cid);

        return res.json({
            cid,
            success: true,
            message: "Fetched Company Account History",
            transactions: accountHistory
        });

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request"})
    }
}

exports.handlePostJob = async (req, res) => {
    const { cid, roleName, location, minCTC, maxCTC } = req.body;

    if (!cid || !roleName || !location || !minCTC || !maxCTC) return res.json({
        success: false,
        message: "Data missing",
    });

    try {
        const company = await Company.findById(cid);
        if (!company) return res.json({success: false, message: "Company not found"});


        const rr = parseFloat((2*(roleName.length) + 5*(location.length)).toFixed(2));

        if(company.balance < rr) return res.json({success: false, message: "Oops! You don't have any rupees in the account"})

        const job = {
            roleName,
            location,
            minCTC,
            maxCTC,
            rr,
            postedBy: company._id,
        }

        const newJob = await JobPost.create(job);


        company.balance -= rr;
        company.accountHistory.push({
            type: "debit",
            amount: rr,
            reason: `Job Posted: ${roleName} at ${location}`,
            date: Date.now()
        });

        company.postRoles.push(newJob._id);

        await company.save();

        await mailSender(company.email, "Job Posted",  `Congrats! You published a new job for <b> ${roleName}</b>`);

        return res.json({
            success: true,
            message: "Job Posted Successfully",
            job: newJob,
            balance: company.balance
        });

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

exports.handleGetAllJob = async (req, res) => {
    const cid = req.params.id;

    if (!cid) return res.json({
        success: false,
        message: "Data missing",
    });

    try {
        const company = await Company.findById(cid).populate("postRoles");

        return res.json({
            cid,
            success: true,
            message: "Fetched Company Job Posts",
            jobs: company.postRoles
        });
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request"})
    }
}