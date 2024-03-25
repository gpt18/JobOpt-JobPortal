const Company = require("../models/company");

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