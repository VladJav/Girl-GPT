const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide user name'],
        minLength: 6,
        maxLength: 32,
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message:  props => `${props.value} is not a valid email!`,
        },
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please provide user password'],
    },
    activationCode:{
        type: String,
    },
    isActivated:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePasswords = async function(candidatePassword) {
    console.log(candidatePassword, this.password);
    return await bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model('User', userSchema);