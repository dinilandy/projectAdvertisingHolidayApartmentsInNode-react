
//אימייל - ייחודי, סיסמה
const mongoose=require('mongoose')
const clientSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model('client',clientSchema)