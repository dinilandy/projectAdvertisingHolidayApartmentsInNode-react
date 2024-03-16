const jwt =require('jsonwebtoken')
const dotenv =require('dotenv')
const apartment = require('../models/apartment')
const category = require('../models/category')
const city = require('../models/city')
const advertiser = require('../models/advertiser')
dotenv.config()
//שליפת כל הדירות 
const getAllapartment = (req,res) => {
    apartment.find()
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
            return res.status(200).send(apartment)
        })
        .catch((error) => {
            return  res.status(404).send(error.message)
        })
}
  //הוספת דירה חדשה
const addApartment=(req, res) => {
       const _id=req.params.advertiserId
    const { path: picture } = req.file
     const { name, description, categoryId, cityId, address, numOfBed, additives, price, advertiserId } = req.body
    const newApartment = new apartment({ 
         name,
         description,
         picture: picture.replace('\\', '/'), categoryId, cityId, address, numOfBed, additives, price, advertiserId })
    if (newApartment.advertiserId != req.params.advertiserId){
    console.log("err");
       return res.status(404).send({ message: `error` })
    }
       advertiser.findById(_id).then((h)=>{
    newApartment.save()
        .then((a) => {
            //הוספת הדירה למערך הדירות בקטגוריה המתאימה
            category.findByIdAndUpdate(categoryId, { $push: { arrApartment: a._id } }, { new: true })
                .then(() => {
                    //הוספת הדירה למערך הדירות בעיר המתאימה
                    city.findByIdAndUpdate(cityId, { $push: { arrApartment: a._id } }, { new: true })
                        .then(() => {
                            //הוספת הדירה למערך הדירות במפרסם המתאים
                            advertiser.findByIdAndUpdate(advertiserId, { $push: { arrApartment: a._id } }, { new: true })
                                .then(() => {
                                    console.log("good");
                                return  res.status(200).send(a)
                                })
                                .catch((err) => {
                                    console.log("err1");
                               return  res.status(500).send({ error: err.message })
                                })
                        })
                        .catch((err) => {
                            console.log("err2");
                            return  res.status(500).send({ error: err.message })
                             })
                })
                .catch((err) => {
                    console.log("err3");
                return res.status(500).send({ error: err.message })
                })
        })
        .catch((err) => {
            console.log("err4");
          return res.status(500).send({ error: err.message })
        })
       
})
}
  //Idשליפה לפי 
const getById=(req, res) => {
    
    apartment.findById(req.params.id)
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
         return  res.status(200).send({apartment})
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })

}
//שליפת דירות לפי קוד קטגוריה
const getByIdCategory=(req, res) => {
    const _id=req.params.idCategory
    apartment.find({categoryId:{$eq: _id}})
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
    .then((a)=>{
   return  res.status(200).send(a)      
    })
    .catch((err)=>{
    return res.status(404).send({ error: err.message })
    })
}
  //שליפת דירות לפי קוד עיר
const getByIdCity=(req, res) => {
    const _id=req.params.idCity
    apartment.find({cityId:{$eq: _id}})
     .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
    .then((a)=>{
    return res.status(200).send(a)      
    })
    .catch((err)=>{
    return res.status(404).send({ error: err.message })
    })

}
// שליפת דירות שמספר המיטות גדול מהמספר שנכנס
const getByBedBigerthen=(req, res) => {
    apartment.find().where("numOfBed").gt(req.params.numOfBed)
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
         return  res.status(200).send(apartment)
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })
}
//שליפת דירותשהמחיר יותר גדול מהנכנס
const getByPriceBigerthen=(req, res) => {
    apartment.find().where("price").gt(req.params.price)
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
         return  res.status(200).send(apartment)
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })
}
//שליפת הדירות שהמיטות קטן למספר שהוכנס

const getByBedsmallerthan=(req, res) => {
    apartment.find().where("numOfBed").lt(req.params.numOfBed)
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
         return  res.status(200).send(apartment)
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })
}
//שליפת הדירות שהמחיר קטן למספר שהוכנס

const getByPricesmallerthan=(req, res) => {
    apartment.find().where("price").lt(req.params.price)
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
         return  res.status(200).send(apartment)
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })
}
//שליפת הדירות שהמיטות שווה למספר שהוכנס
const getByBedeq=(req, res) => {
    apartment.find().where("numOfBed").eq(req.params.numOfBed)
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
         return  res.status(200).send(apartment)
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })
}
//שליפת הדירות שהמחיר שווה למספר שהוכנס
const getByPriceeq=(req, res) => {
    apartment.find().where("price").eq(req.params.price)
    .populate({path:'advertiserId cityId categoryId',select:'name email phone1 phone2 nameCategory nameCity'})
        .then((apartment) => {
         return  res.status(200).send(apartment)
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })
}
//שליפת דירות לפי מפרסם דרך המערך
const getByIdAdvertiser=(req, res) => {
    advertiser.findById({_id:req.params.advertiserId}).populate({path:'arrApartment',select:'name description categoryId cityId address numOfBed additives price advertiserId picture'})
    .populate({path:'arrApartment.cityId arrApartment.categoryId',select:'nameCategory nameCity'})
        .then((apartment) => {
            if(!apartment){
         return  res.status(404).json({message:`Advertiser not found!`})
            }
         return  res.status(200).send(apartment)
})
        .catch((error) => {
            return  res.status(404).json({message:`Advertiser not found!`})
        })

}
//עדכון דירה
const update=(req, res) => {
    const _id = req.params.id
     
     apartment.findById(_id)

     .then((ap) => {
        const {  categoryId,advertiserId, cityId } = req.body   
             if (categoryId && categoryId != ap.categoryId)  {
                return res.status(400).send({ message: `Cannot update categoryId!` })
             }
            if(advertiserId && advertiserId != ap.advertiserId){
                return res.status(400).send({ message: `Cannot update advertiserId!` })
            }
            if(cityId && cityId != ap.cityId){
                return res.status(400).send({ message: `Cannot update cityId!` })
            }

            return apartment.findByIdAndUpdate(_id, req.body, { new: true })
                .then((ap) => {
                    return  res.status(200).send(ap)
            })
            .catch((error) => {
            return  res.status(500).send({ error: error.message })
            })
        })
        .catch((error) => {
            return  res.status(500).send({ error: error.message })
            })
}
//מחיקת דירה
const remove=(req, res) => {
    console.log("aaaaaaa");
    apartment.findById(req.params.id)
    .then((a) => {
        if (a.advertiserId != req.params.advertiserId){
            console.log("error");
            return res.status(404).send({ message: `error` })
            
        }
        category.findByIdAndUpdate(a.categoryId, { $pull: { apartments: a._id } })
            .then(() => {
                //מחיקת הדירה ממערך הדירות בעיר המתאימה
                city.findByIdAndUpdate(a.cityId, { $pull: { apartments: a._id } })
                    .then(() => {
                        //מחיקת הדירה ממערך הדירות במפרסם המתאים
                        advertiser.findByIdAndUpdate(a.advertiserId, { $pull: { apartments: a._id } })
                            .then(() => {
                                a.deleteOne()
                                
                                .then( ()=>{console.log("good");
                                    res.status(200).send({ message: `delete apartment succeed!` })
                                })
                                .catch((err) => {
                                    console.log("err1");

                                    res.status(500).send({ error: err.message })
                            })
                            .catch((err) => {
                                console.log("err2");
                                res.status(500).send({ error: err.message })
                            })
                    })
            })
            .catch((err) => {
                console.log("err3");

                res.status(500).send({ error: err.message })
            })
    })
    .catch((err) => {
        console.log("err4");

        res.status(500).send({ error: err.message })
    })
})

    .catch((err) => {
        res.status(404).send({ error: err.message })
    })

}
module.exports ={getAllapartment,addApartment,getById,update,remove,getByIdCategory,getByIdCity,getByBedBigerthen,getByBedsmallerthan,getByBedeq,getByPriceeq,getByPriceBigerthen,getByPricesmallerthan,getByIdAdvertiser}