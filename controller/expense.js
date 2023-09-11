const express = require("express");
const bcrypt=require('bcrypt')
const expense=require('../models/expense')


exports.createExpenseController=async(req,res)=>{
    try{
        const amount=req.body.amount
        const description=req.body.description
        const category=req.body.category
        

        if(amount===undefined||amount.length===0 ||description===undefined||description.length=== 0||category===undefined||category.length===0){
            return res.status(400).json({err:'bad parameters something is missing'})
        }
        
            console.log('this is postdata.............>>>>>>',amount,description)
            const data=await expense.create({
                amount:amount,
                description:description,
                category:category,
                userId:req.user.id
            })
            res.status(200).json({expensedata:data})
        
        }
    
    catch(error){
        console.log("error..........>>>>>>>>>>",error)
        res.status(500).json({error:"failed to create expense"})
    }

}
//getexpense
exports.getExpenseController=async(req,res)=>{
    try{
        const data =await expense.findAll({where:{userId:req.user.id}})
       return res.status(200).json({allexpensedata:data})

    }
    catch(err){
        console.log('this is get error>>..>>',err)
    }
}
//deltexpense
exports.deleteExpenseController=async(req,res)=>{
    const uId=req.params.id
    try{
        if(uId===undefined){
            console.log("id not get")
            return res.status(400).json({error:"id is missing"})
          
        }
        await expense.destroy({where:{id:uId,userId:req.user.id}})
        res.status(200).send()
    }
    catch(err){
        console.log("deleted data error",err)
        res.status(500).json({error:"data is not deleting"})
    }
}