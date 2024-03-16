const mongoose=require('mongoose')
const advertiserSchema=mongoose.Schema(
    {//אימייל - ייחודי, סיסמה, טלפון, טלפון נוסף – לא חובה, מערך דירות
        
        email:
        {
         type:String,
          unique:true,
          required:true
        },
        password: {
            type:String,
            required:true
           },
           phone1 :{
             type:String,
             required:true
           },
           phone2 :{
            type:String,
            required:false
          },
          arrApartment:[
            {
              type:mongoose.Types.ObjectId,  
              required:false,  
              ref:'apartment'
            }
          ]

    }
)
module.exports=mongoose.model('advertiser',advertiserSchema)