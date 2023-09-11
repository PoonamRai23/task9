const express= require('express')
const app=express()
const path=require('path')
const sequelize=require('./util/user')
const userRouter =require('./routes/user')
const router=require('./routes/expense')
const user = require("./models/user");
const expense = require("./models/expense");
const jwt=require('jsonwebtoken')
const bodyparser=require('body-parser')
const cors=require('cors')
const Order = require('./models/orders')
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
const purchaseRoutes = require('./routes/purchase')

 app.use(express.static(path.join(__dirname,'views')))
app.use('/',router)
 app.use('/',userRouter)
app.use('/',purchaseRoutes)
 user.hasMany(expense)
 expense.belongsTo(user)

 user.hasMany(Order);
Order.belongsTo(user);




sequelize.sync({alter:true})
.then((result)=>{
    console.log('data sync',result)

    app.listen(3050)
}) 
.catch((error)=>{
    console.log(error)

})
// app.listen(3050)

