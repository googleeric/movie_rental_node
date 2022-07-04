const jwt = require('jsonwebtoken')
require('dotenv').config()
const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        min: 5,
        max: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.PRIVATE_KEY)
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(3).max(10).required()
    })

    return schema.validate(user)
}

exports.User = User
exports.validateUser = validateUser