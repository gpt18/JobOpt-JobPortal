const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    resume: {
        type: String,
    },
    phone: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    location: {
        type: String,
    },
    appliedJobs: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            job: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'JOB'
            }
        }
    ],
    balance: {
        type: Number,
        default: 0
    },
    accountHistory: [
        {
            amount: {
                type: Number
            },
            type: {
                type: String
            },
            date: {
                type: Date
            },
            reason: {
                type: String
            }
    
        }
    ],

}, { timestamps: true });

const Student = mongoose.model('STUDENT', studentSchema);

module.exports = Student;