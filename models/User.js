const mongoose = require('mongoose');
const { isEmail} = require('validator');
const bcrypt = require('bcrypt');

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

// Fire a function after Document is saved in Mongo DB
// userSchema.post('save', async (doc, next) => {
//     console.log("The data is added", doc);
//     next();
// })

// Fire a function before Document is saved in Mongo DB
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log("user about to be created and saved", this);

    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;