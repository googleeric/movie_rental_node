const Joi = require('joi');
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlengh : 3,
        maxlength: 10
    }
})

const Course = mongoose.model('course', courseSchema)

//Validate Course Function
function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(course)
}
 
module.exports.Course = Course
module.exports.validateCourse = validateCourse