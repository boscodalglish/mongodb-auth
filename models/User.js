const mongoose = require('mongoose');
const { isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a email address"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, "Enter a Valid email"]
 
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum length is 6 character"],
        maxlength: [12, "Maximum length is 12 character"],
        trim: true,
        validate: [() => {}, "Enter a Valid Password"]
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;