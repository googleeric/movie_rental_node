const express = require('express')
const router = express.Router()
const {Course, validateCourse} = require('../models/course')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name');
    res.send(courses);
})

router.get('/:id', async (req, res) => {

    const course = await Course.findById(req.params.id);
    if(!course){
        return res.status(404).send('The Course with the Given Id not Found')
    }
    res.send(course);
})

router.post('/', async (req, res) =>{

    const {error} = validateCourse(req.body)
    if(error){
        return res.status(400).send(error.message)
    }
    let course = new Course({
        name: req.body.name
    })
    course = await course.save()
    res.send(course)
})

router.put('/:id', async (req, res) =>{

    //Validate Name Text
    const {error} = validateCourse(req.body)

    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    const course = await Course.findByIdAndUpdate(req.params.id, {name : req.body.name}, {
        new : true
    } )
    //Validate ID
    if(!course){
        return res.status(404).send('The Course with the Given Id not Found')
    }

    res.send(course)

})

router.delete('/:id', [auth, admin], async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if(!course){
        return res.status(404).send('The Course with the Given Id not Found')
    }

    res.send(course)
})

module.exports = router