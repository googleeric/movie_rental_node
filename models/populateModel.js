const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})
const Author = mongoose.model('Author', authorSchema)

const courseSchema = new mongoose.Schema({
    name : String
})
const Course = mongoose.model('Course', courseSchema)

model.exports.Author = Author,
model.exports.Course = Course