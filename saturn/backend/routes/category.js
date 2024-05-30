const express = require('express')
const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const router = express.Router()

router.post('/addcategory',async(req,res)=>{
    
    const category = new Category({
        categoryname:req.body.categoryname
    })
    await category.save()
    res.send(category)
})

router.post('/addsubcategory',async(req,res)=>{
    
    const subcategory = new Subcategory({
        subcategoryname:req.body.subcategoryname
    })
    await subcategory.save()
    res.send(subcategory)
})

module.exports = router