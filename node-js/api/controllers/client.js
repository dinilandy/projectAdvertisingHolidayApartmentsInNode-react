const client =require("../models/client")
 const nodemailer=require('nodemailer')
 const jwt =require('jsonwebtoken')
const dotenv =require('dotenv')
const bcrypt=require('bcrypt')
dotenv.config()
    //שליפת כל הלקחות 
const getAllClient = (req,res) => {
    client.find()
        .then((client) => {
            return res.status(200).send(client)
        })
        .catch((error) => {
            return  res.status(404).send(error.message)
        })
}
   //הוספת לקוח
const clientRegister = (req, res) => {
const {email,password}=req.body
    bcrypt.hash(password,12,(error,hash)=>{
        if(error)
          return req.status(500).send({error:err.message})

    const newClient = new client({
        email,
        password:hash
        
    })
    newClient.save()
    .then((client) => {
        if(client){
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        email: 'dini0527197044@gmail.com',
                        pass: 'DTitB!4e'
                    }
                });
                let mailOptions = {
                    from: 'dini0527197044@gmail.com',
                    to: client.email,
                    subject: 'Hi, ' + client.email,
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
             return  res.status(200).send( client)
            })
            .catch((error) => {
             return   res.status(400).send(error.message)
            })
        })
}
//התחברות כלקוח
const clientLogin = (req, res) => {
    const email=req.params.email
    const password=req.params.password
    client.find({ email: { $eq: email } })
        .then(users => {
            if (users.length == 0) {
                return res.status(409).send({ message: 'Email and password are not matches!' })
            }
        const [user] = users
        bcrypt.compare(password, user.password, (error, result) => {
            if (error || !result) {
                return res.status(500).send({ error: 'Email and password are not matches!' })
            }
            const token = jwt.sign({ email, password}, process.env.TOKEN, {
                expiresIn: '1H'
            })
            //שליחת הצופן לצד שרת בכניסה למערכת
           return res.status(200).send({ message: 'login succeefull!',user:user, token:token })
        })
    })
    .catch(error => {
    return    res.status(404).send({ error: error.message })
    })
    
    }

module.exports ={clientRegister,clientLogin,getAllClient}