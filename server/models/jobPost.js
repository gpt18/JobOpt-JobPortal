const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    minCTC: {
        type: Number,
        required: true
    },
    maxCTC: {
        type: Number,
        required: true
    },
    rr: {
        type: Number,
        required: true
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'COMPANY'
    },
    appliedCandidates: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'STUDENT'
        }
    ]

}, { timestamps: true });

const JobPost = mongoose.model('JOB', jobPostSchema);

module.exports = JobPost;