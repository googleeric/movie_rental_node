const Joi = require('joi');
const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema({
    customer :{
        type: new mongoose.Schema({
            name: {
                type : String
            },
            isGold : {
                type: Boolean
            },
            phone: {
                type : String
            },

        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String
            },
            dailyRentalRate:{
                type: Number
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date
    },
    rentalFee:{
        type: Number
    }
})

const Rental = mongoose.model('Rental', rentalSchema)

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
    return schema.validate(rental)
}

exports.Rental = Rental
exports.validate = validateRental    