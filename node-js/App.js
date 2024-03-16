const express = require('express')
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const dotenv = require('dotenv')
const router = require('./api/routes/api')
const cors =require('cors')
const app = express()

dotenv.config()
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-Wit, Content-Type, Accept")
    next()
    });
    app.options('*',cors())

app.use(bodyParser.json())
app.use(cors())

app.use('/uploads',express.static('uploads'))
//חיבור למונגו
mongoose.connect(process.env.URI, {})
.then(()=>{
console.log('connection to mongodb succeed!');

})
.catch(error=>{
    console.log({error})
})



app.use('/', router)

app.get('/', (req, res) => {
    res.send('WELLCOME!🤩🤩🤩🤩🤩')
})
//יצירת מאזין
app.listen(3001, () => {
    console.log(`my app is listening in http://localhost:3001`);
 })
