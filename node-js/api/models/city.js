const mongoose=require('mongoose')
const citychema=mongoose.Schema({
    nameCity:{
        type:String,
        required:true
    },
    arrApartment:[
        {
            type:mongoose.Types.ObjectId,
            required:false,
            ref:'apartment'
        }
      ]

})
module.exports=mongoose.model('city',citychema)