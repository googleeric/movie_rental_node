const Joi = require('joi');
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    }
})

const Genre = mongoose.model('Genre', genreSchema)

exports.Genre = Genre
exports.genreSchema = genreSchema