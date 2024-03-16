const nodemailer=require('nodemailer')
const jwt =require('jsonwebtoken')
const dotenv =require('dotenv')
const bcrypt=require('bcrypt')
const advertiser = require("../models/advertiser")
dotenv.config()
//שליפת כל המפרסמים
const getAllAdv = (req,res) => {
    advertiser.find()
        .then((advertiser) => {
            return res.status(200).send(advertiser)
        })
        .catch((error) => {
            return  res.status(404).send(error.message)
        })
}
//הרשמה 
const advertiserRegister = (req, res) => {
     const {email,password,phone1,phone2,arrApartment}=req.body
    bcrypt.hash(password,12,(error,hash)=>{
        if(error)
          return req.status(500).send({error:err.message})

    const newAdvertiser = new advertiser({
        email,
        password:hash,
        phone1,phone2,arrApartment
    })
    newAdvertiser.save()
    .then((advertiser) => {
        if(advertiser){
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        email: 'dini0527197044@gmail.com',
                        pass: 'DTitB!4e'
                    }
                });
                let mailOptions = {
                    from: 'dini0527197044@gmail.com',
                    to: advertiser.email,
                    subject: 'Hi, ' + advertiser.email,
                    text: 'Wellcome to our organization!\n Your registeration got successfull.'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
             return   res.status(200).send(advertiser)
            })
            .catch((error) => {
             return   res.status(400).send(error.message)
            })
        })
}

    //התחברות לפי מייל וסיסמא
const advertiserLogin = (req, res) => {
    const email=req.params.email
    const password=req.params.password
    advertiser.find({ email: { $eq: email } })
        .then(users => {
            if (users.length == 0) {
                return res.status(409).send({ message: 'Email and password are not matches!' })
            }
        const [user] = users
        bcrypt.compare(password, user.password, (error, result) => {
            if (error || !result) {
                return res.status(500).send({ error: 'Email and password are not matches!' })
            }
            const token = jwt.sign({ email, password,advertiser:user }, process.env.TOKEN, {
                expiresIn: '1H'
            })
            //שליחת הצופן לצד שרת בכניסה למערכת
           return res.status(200).send({ message: 'login succeefull!',advertiser:user, token:token })
        })
    })
    .catch(error => {
    return    res.status(404).send({ error: error.message })
    })
}
//שליפת דירות לפי מפרסם 
const getApartmentsByAdvertiser=((req,res)=>{
    const _id=req.params.idAdvertiser
    advertiser.findById(_id)
    .populate({ path: 'arrApartment', select: 'name descreption address', strictPopulate: false })
    .then((a)=>{
      res.status(200).send({apartments:a.arrApartment})
    })
    .catch((err)=>{
      res.status(404).send({ error: err.message })

    })
})


module.exports ={advertiserRegister,advertiserLogin,getAllAdv,getApartmentsByAdvertiser}