require('dotenv').config()

module.exports = function(){
    if(!process.env.PRIVATE_KEY){
        throw new Error('FATAL ERROR: Private Key Not Defined..')
    }
}