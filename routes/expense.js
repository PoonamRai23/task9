const express=require('express')
const router=express.Router()
const path=require('path')
const Sequelize=require('../util/user')
const expense=require('../models/expense')
const cors=require('cors')
const expenseController=require('../controller/expense')
const verifyToken = require("../controller/user")
const middleware=require('../middleware/auth')
const jwt=require('jsonwebtoken')
router.use(cors())
const bodyparser=require('body-parser')

router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())
 router.use(express.static(path.join(__dirname,'views')))


router.post('/expense',middleware.authenticate,expenseController.createExpenseController)
router.get('/expense',middleware.authenticate,expenseController.getExpenseController)
router.delete('/expense/:id',middleware.authenticate,expenseController.deleteExpenseController)
module.exports=router