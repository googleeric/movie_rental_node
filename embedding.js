const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/embedding')
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
        author: [authorSchema]
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

async function updateAuthor(id){
   const course = await Course.update({_id : id}, {
    $unset: {
        "author": "" 
    }
   });
}

async function addAuthor(id, author){
    const course = await Course.findById(id)
    course.author.push(author)
    course.save()
}

async function removeAuthorArray(courseId, authorId){
    const course = await Course.findById(courseId)
    const author = course.author.id(authorId)
    author.remove()
    course.save()
}
// updateAuthor("62a5ac0e9828261a361a49e1")
// createCourse("Node Course",[
//     new Author({ name: "Manish"}),
//     new Author({ name: "Chetan"})
// ])

removeAuthorArray('62a5acbcdb28bcfddf8bc903', '62a5ad15d83ad667f683c4c3')