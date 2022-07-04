const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const {User} = require('../models/user')

router.post('/', async (req, res) =>{
    const {error} = validateAuth(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const userExist = await User.findOne( {email: req.body.email})
    if(!userExist){
        return res.status(400).send('Invalid Email or Password')
    }
    
      const validPassword = await bcrypt.compare(req.body.password, userExist.password)
      if(!validPassword){
        return res.status(400).send('Invalid Email or Password')
      }
      const token = userExist.generateAuthToken()
      res.header('x-auth-token',token).send(token)
    
    
})

function validateAuth(req){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(3).max(10).required()
    })

    return schema.validate(req)
}

module.exports = router