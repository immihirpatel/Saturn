const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "MihirBhai"
const fetchuser = require('../middleware/fetchuser')


//Creating a user using POST method.....doesn't require authentication
router.post('/createuser', [body('name', 'Name should not be empty').notEmpty(),
body('email', 'Enter Valid email').isEmail(),
body('password', 'Password must be 5 charaters long').isLength({ min: 5 })], async (req, res) => {

    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.send({ error: result.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = await jwt.sign(data, JWT_SECRET)
        res.json({success:true,authtoken})
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).json({ error: "Something went wrong" })
    }
})

router.post('/login', async(req,res)=>{
    const  {email,password} = req.body
    let user =await User.findOne({email})
    console.log(user)
    const passwordCompare =await bcrypt.compare(password,user.password)
    if(!passwordCompare){
        return res.status(400).json({error:"Oops! Wrong Credentials"})
    }
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken = await jwt.sign(data,JWT_SECRET)
    res.json({success:true, authtoken})
})

router.post('/getuser',fetchuser, async(req,res)=>{
    userId = req.user.id
    try{
    const user = await User.findById(userId).select('-password')
    res.send(user)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({error:"Something went wrong"})
    }
})
module.exports = router