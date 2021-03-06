const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next){
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).send('Access Denied. No Token Provided')
    }
    try{
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = decoded
        next()
    }
    catch(ex){
        res.status(400).send('Token Invalid')
    }
}

module.exports = auth