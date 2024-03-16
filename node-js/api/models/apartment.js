//שם – לא חובה, תיאור, תמונה, קוד קטגוריה, קוד עיר, כתובת, מס' מיטות, תוספים, מחיר, קוד מפרסם
const mongoose = require('mongoose')
const apartmentSchema =mongoose.Schema({
    //שם
    name: {
        type: String,
        required:false

    }, 
    //תיאור
    description:{
        type:String,
        required:true
    },
    //תמונה
    picture:{
        type:String,
         required:true
    },
    //קוד קטגוריה
    categoryId:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'category'
    },
    //קוד עיר
    cityId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'city'
    },
    //כתובת
    address:{
      type:String,
      required:true
    },
    //מספר מיטות
    numOfBed:{
       type:Number,
       required:true
    },
    //תוספים
    additives:
    {
        type:String,
        required:true

    },
    //מחיר
    price:{
        type:Number,
        required:true

    },
    //קוד מפרסם
    advertiserId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'advertiser'
    }



})
module.exports =mongoose.model('apartment',apartmentSchema)