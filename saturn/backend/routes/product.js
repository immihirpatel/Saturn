const express = require('express')
const Product = require('../models/Product')
const Mobile = require('../models/Products/Mobiles')
const Book = require('../models/Products/Books')
const Cloth = require('../models/Products/Cloths')
const Cosmetic = require('../models/Products/Cosmetics')
const Grocery = require('../models/Products/Groceries')
const Headphone = require('../models/Products/Headphones')
const Television = require('../models/Products/Televisions')
const Watch = require('../models/Products/Watches')
const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const mongoose = require('mongoose')
const router = express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname )
    }
  })
  const categoryModelMap = {
    'Mobile': Mobile,
    'Book': Book,
    'Cloth': Cloth,
    'Cosmetic': Cosmetic,
    'Grocery': Grocery,
    'Headphone': Headphone,
    'Television': Television,
    'Watch': Watch
  };
  
  const upload = multer({ storage: storage })

router.post('/addproduct',upload.single('image'),async (req,res)=>{
    
    const product = new Product({
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        qty:req.body.qty,
        image:req.file.filename,
        category:req.body.category_id,
        subcategory:req.body.subcategory_id
    })
    await product.save()
    res.send(product)
})
// to add a cloths TODO: make a mid
router.post('/addcloths',async (req,res)=>{
    
    const cloth = new Cloth({
        product:req.body.p_id,
        size:req.body.size,
        fabric_type:req.body.fabric_type,
        country_of_origin:req.body.country_of_origin,
        neck_style:req.body.neck_style,
        manufacturer:req.body.manufacturer,
        customer_ratings:req.body.customer_ratings,
        color:req.body.color,
        item_type:req.body.item_type
    })
    await cloth.save()
    res.send(cloth)
})
router.post('/addcosmetics',async (req,res)=>{
    
    const cosmetic = new Cosmetic({
        product:req.body.p_id,
        brand_name:req.body.brand_name,
        item_type:req.body.item_type,
        item_weight:req.body.item_weight,
        customer_ratings:req.body.customer_ratings,
        color:req.body.color
    })
    await cosmetic.save()
    res.send(cosmetic)
})
router.post('/addgrocery',async (req,res)=>{
    
    const grocery = new Grocery({
        product:req.body.p_id,
        brand_name:req.body.brand_name,
        manufacturer:req.body.manufacturer,
        customer_ratings:req.body.customer_ratings,
        item_weight:req.body.item_weight,
        item_type:req.body.item_type,
        nutritional_info:req.body.nutritional_info,
        pkg_info:req.body.pkg_info
    })
    await grocery.save()
    res.send(grocery)
})

router.post('/addheadphone',async (req,res)=>{
    
    const headphone = new Headphone({
        product:req.body.p_id,
        brand_name:req.body.brand_name,
        model_name:req.body.model_name,
        customer_ratings:req.body.customer_ratings,
        color:req.body.color,
        form_factor:req.body.form_factor,
        connectivity_technology:req.body.connectivity_technology,
        controls:req.body.controls,
        battery_information:req.body.battery_information,
        audio_features:req.body.audio_features
    })
    await headphone.save()
    res.send(headphone)
})
router.post('/addmobile',async (req,res)=>{
    
    const mobile = new Mobile({
        product:req.body.p_id,
        brand_name:req.body.brand_name,
        model_name:req.body.model_name,
        customer_ratings:req.body.customer_ratings,
        color:req.body.color,
        screen_size:req.body.screen_size,
        varient1:req.body.varient1,
        varient2:req.body.varient2,
        front_camera:req.body.front_camera,
        back_camera:req.body.back_camera,
        OS:req.body.os
    })
    await mobile.save()
    res.send(mobile)
})
router.post('/addtelevision',async (req,res)=>{
    
    const television = new Television({
        product:req.body.p_id,
        brand_name:req.body.brand_name,
        model_name:req.body.model_name,
        customer_ratings:req.body.customer_ratings,
        color:req.body.color,
        screen_size:req.body.screen_size,
        connectivity:req.body.connectivity,
        audio_features:req.body.audio_features
    })
    await television.save()
    res.send(television)
})
router.post('/addwatch',async (req,res)=>{
    
    const watch = new Watch({
        product:req.body.p_id,
        brand_name:req.body.brand_name,
        model_name:req.body.model_name,
        customer_ratings:req.body.customer_ratings,
        color:req.body.color,
        screen_size:req.body.screen_size,
        strap_band:req.body.strap_band
    })
    await watch.save()
    res.send(watch)
})
router.post('/addbook',async (req,res)=>{
    
    const book = new Book({
        product:req.body.p_id,
        release_date:req.body.release_date,
        publisher_name:req.body.publisher_name,
        author_name:req.body.author_name,
        item_weight:req.body.item_weight,
        language:req.body.language,
        customer_ratings:req.body.customer_ratings
    })
    await book.save()
    res.send(book)
})


//TO DO
router.get('/getproduct', async(req,res)=>{
    //const id = req.body
    //console.log(id)
    const product = await Product.find()
    res.send(product)   
})
router.get('/getspecificproduct/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id).populate("subcategory") 
    const cat_name = await product.subcategory.subcategoryname
    const specificProductModel = categoryModelMap[cat_name];
    const specific_product = await specificProductModel.findOne({product:req.params.id}).populate("product") 
    //res.send(specific_product)
   
    res.send(specific_product)
})

router.get('/getcategory/:id', async(req,res)=>{
    const product = await Product.findById(req.params.id).populate("subcategory") 
    const cat_name = await product.subcategory.subcategoryname
    res.json(cat_name)
})
module.exports = router