const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    profile: {
        type: Boolean,
        require: true,
        default: false
    },
    role: {
        type: String,
    },

},{timestamps: true});

const User = mongoose.model("USER", userSchema);

module.exports = User;