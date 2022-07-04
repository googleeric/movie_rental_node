const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/population')
    .then(() => console.log('Connected To the MongoDb'))
    .catch( err => console.log('Could Not Connect', err))

    const authorSchema = new mongoose.Schema({
        name: String,
        bio: String,
        website: String
    })
    const Author = mongoose.model('Author', authorSchema)
    
    const courseSchema = new mongoose.Schema({
        name : String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author"
        }
    })
    const Course = mongoose.model('Course', courseSchema)

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    })
    const result = await author.save()
    console.log(result)
}    

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    })
    const result = await course.save()
    console.log(result)
}

async function listCourseWithAuthor(){
    const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author')
    console.log(courses)
}

listCourseWithAuthor()