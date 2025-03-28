

const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
const path = require('path')
connectToMongo()



const app = express()
app.use(cors())
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.static(path.join(__dirname,'./build')))

app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/product'))
app.use('/api/category',require('./routes/category'))
app.use('/api/order',require('./routes/order'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/card',require('./routes/card'))
app.use('/api/orderdetails',require('./routes/orderdetails'))


app.use('*', function(req,res){
res.sendFile(path.join(__dirname,'./build/index.html'));
})
//app.use('/api/book',require('./routes/product'))
//app.use('/api/cloth',require('./routes/product'))
//app.use('/api/cosmetic',require('./routes/product'))
//app.use('/api/grocery',require('./routes/product'))
//app.use('/api/headphone',require('./routes/product'))
//app.use('/api/mobile',require('./routes/product'))
//app.use('/api/television',require('./routes/product'))
//app.use('/api/watch',require('./routes/product'))




app.listen(port,()=>{
    console.log(`App listening at port http://localhost:${port}`)
})