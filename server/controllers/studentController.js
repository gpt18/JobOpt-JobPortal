const Company = require("../models/company");
const JobPost = require("../models/jobPost");
const Student = require("../models/student");
const { mailSender } = require("../utils/mailSender");
const User = require("../models/registerdUser");

exports.handleGetStudentProfile = async (req, res) => {
    const email = req.params.email;

    if (!email) return res.json({
        success: false,
        message: "Incomplete data provided. Please provide email address to fetch company profile.",
    });

    try {
        const student = await Student.findOne({email});
        const user = await User.findOne({email});

        return res.json({
            sid: student._id,
            email: student.email,
            balance: student.balance,
            name: student.name,
            resume: student.resume,
            location: student.location,
            phone: student.phone,
            profilePic: student.profilePic,
            profile: user.profile,
            success: true,
            message: "Student Profile fetched successfully"
        });
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request", error: error.message})
    }
}

exports.handleGetStudentTransactions = async (req, res) => {
    const sid = req.params.id;

    if (!sid) return res.json({
        success: false,
        message: "Data missing",
    });

    try {
        const { accountHistory } = await Student.findById(sid);

        return res.json({
            sid,
            success: true,
            message: "Fetched Student Account History",
            transactions: accountHistory
        });

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request"})
    }
}

exports.handleGetAllJob = async (req, res) => {

    try {
        const jobs = await JobPost.find({}).select('-appliedCandidates').populate(
            {
                path: 'postedBy',
                select: 'companyName companyLogo websiteLink'
            }
        );

        if (!jobs) {
            return res.json({ success: false, message: "No jobs found" });
        }

        return res.json({
            success: true,
            message: "Fetched all open job Posts",
            jobs
        });
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request"})
    }
}

exports.handleApplyJob = async (req, res) => {
    const sid = req.body.sid;
    const jid = req.params.id;

    if (!sid || !jid) return res.json({
        success: false,
        message: "Data missing",
    });

    try {
        const job = await JobPost.findById(jid);
        const student = await Student.findById(sid);
        const company = await Company.findById(job.postedBy);

        if (!job || !student) return res.json({success: false, message: "Job or Student not found"});

        if(job.appliedCandidates.includes(sid)) return res.json({success: false, message: "You have already applied for this job"});

        if (job.rr > student.balance) return res.json({success: false, message: "Oops you don't have enough balance"});

        job.appliedCandidates.push(sid);
        
        student.balance = +(student.balance - job.rr).toFixed(2);

        student.appliedJobs.push({ date: new Date(), job: jid });

        student.accountHistory.push({
            type: "debit",
            amount: job.rr,
            date: new Date(),
            reason: `Applied for ${job.roleName} at ${company.companyName}`
        });

        const cashback = parseFloat((job.rr * 0.2).toFixed(2))
        student.balance = +(student.balance + cashback).toFixed(2);

        student.accountHistory.push({
            type: "credit",
            amount: cashback,
            date: new Date(),
            reason: `Cashback for applying ${job.roleName} at ${company.companyName}`
        });

        const commission = parseFloat((job.rr * 0.5).toFixed(2))
        company.balance = +(company.balance + commission).toFixed(2);
        
        company.accountHistory.push({
            type: "credit",
            amount: commission,
            date: new Date(),
            reason: `Received payment for job post ${job.roleName} by ${student.name}`
        });


        
        await job.save();
        await company.save();
        await student.save();

        await mailSender(company.email, "Job Notification", `${student.name} applied for this role ${job.roleName}`)

        return res.json({
            success: true,
            message: "Job Applied Successfully",
            balance: student.balance
        });

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request"})
    }
}

exports.handleGetAppliedJobs = async (req, res) => {
    const sid = req.params.id;

    if (!sid) return res.json({
        success: false,
        message: "Data missing",
    });

    try {
        const { appliedJobs } = await Student.findById(sid).populate({
            path: 'appliedJobs.job',
            select: 'roleName location minCTC maxCTC rr',
            populate: {
                path: 'postedBy',
                select: 'companyName companyLogo websiteLink'
            }
        });

        return res.json({
            sid,
            success: true,
            message: "Fetched Student Applied Jobs",
            appliedJobs
        });

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: "Invalid Request"})
    }
}