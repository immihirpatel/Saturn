const express = require('express')
const router = express.Router()
const Card= require("../models/Card")
const fetchuser = require('../middleware/fetchuser')
const fetchproduct = require('../middleware/fetchproduct')




router.post("/addcard", fetchuser,async (req,res)=>{
    const card = await Card.findOne({cardnumber:req.body.cardnumber})

    if (!card){
        const card = new Card({
            name:req.body.name,cardnumber:req.body.cardnumber,expdate:req.body.expdate,cvv:req.body.cvv,user:req.user.id
        })
        const savecard = await card.save()
        res.json(savecard)
    }
    else{
        res.status(400).json({error:"Card Already Exist"})
    }
})

module.exports = router