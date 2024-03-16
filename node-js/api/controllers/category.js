const nodemailer=require('nodemailer')
const jwt =require('jsonwebtoken')
const dotenv =require('dotenv')
const category = require('../models/category')
const advertiser = require('../models/advertiser')
dotenv.config()
    //שליפת כל הקטגוריות 
const getAllcategory = (req,res) => {
    category.find()
    .populate({ path: 'arrApartment', select: 'name advertiserId discription categoryId cityId', strictPopulate: false })
        .then((category) => {
            return res.status(200).send(category )
        })
        .catch((error) => {
            return  res.status(404).send(error.message)
        })
}
   //הוספת קטגוריה
const addCategory=(req, res) => {
    const token = jwt.sign(
        { name: req.body.nameCategory, password: req.body.arrApartment },
       process.env.TOKEN)
       const _id=req.params.advertiserId
   const newcategory = new category(req.body)
   
   advertiser.findById(_id).then((h)=>{
       newcategory.save()
   
       .then((newcategory) => {
        return   res.status(200).send(`Create category ${newcategory.nameCategory}   succeed \n token: ${token}`)
       })
       .catch((error) => {
         return  res.status(404).send({ error: error.message })
       })
   })
   .catch((error)=>{
       return  res.status(404).send({ error: error.message })
   })
}

module.exports ={getAllcategory,addCategory}