function admin(req, res, next){
    if(!req.user.isAdmin){
        //403 Forbidden (don't try again)
        return res.status(403).send('Access Denied')
    } 
    next()
}

module.exports = admin