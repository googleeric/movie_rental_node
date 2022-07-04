const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const winston = require('winston')
const app = express()
require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

// throw new Error('Something Failed');

// const p = Promise.reject(new Error('Something Failed Miserbly'))
// p.then( () => console.log('Don'))


//PARAMETERS
app.get('/api/post/:year/:month', (req, res) =>{
    res.send(req.query)
})

//Port Through ENV 
const port = process.env.PORT || 3000;

app.listen(3000, () => winston.info(`Listening on Port ${port}..`))