//שם קטגוריה (צימר, יחידת אירוח, דירה להשכרה...), מערך דירות
const mongoose=require('mongoose')
const categorySchema=mongoose.Schema(
    {
        nameCategory: {
            type: String,
            required:true
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
module.exports =mongoose.model('category',categorySchema)
