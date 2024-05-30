const jwt = require('jsonwebtoken')
const JWT_SECRET = "MihirBhai"

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(400).json({error:"Unauthorized access to the website"})
    }
    try{
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user
    next()
    }
    catch(error){
        return res.status(500).json({error})
    }
}
module.exports = fetchuser