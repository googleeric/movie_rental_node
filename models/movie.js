const Joi = require('joi');
const mongoose = require('mongoose')
const {genreSchema} = require('../models/genre')

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim: true
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true
    },
    dailyRentalRate:{
        type: Number
    }
})

const Movies = mongoose.model('Movies', movieSchema)

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    })

    return schema.validate(movie)
}

exports.Movies = Movies
exports.validateMovie = validateMovie