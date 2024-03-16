 const nodemailer=require('nodemailer')
 const jwt =require('jsonwebtoken')
const dotenv =require('dotenv')
const apiKey = 'bceb6f0a4a193a7f3b995a342d400279'
const axios = require('axios');
const City = require('../models/city');
const advertiser = require('../models/advertiser');

dotenv.config()
// const request = require('request')
// const kelvinToCelsius = require('kelvin-to-celsius')

    //שליפת כל הערים
const getAllCity = (req,res) => {
    City.find()
    .populate({ path: 'arrApartment', select: 'name advertiserId discription categoryId cityId', strictPopulate: false })
        .then((city) => {
            return res.status(200).send(city)
        })
        .catch((error) => {
            return  res.status(404).send(error.message)
        })
}
 //הוספת עיר 
const addCity=(req, res) => {
     const token = jwt.sign(
         { name: req.body.nameCity, password: req.body.arrApartment },
        process.env.TOKEN)
        const _id=req.params.advertiserId
    const newcity = new City(req.body)
    
    advertiser.findById(_id).then((h)=>{
        newcity.save()
    
        .then((newcity) => {
         return   res.status(200).send(`Create city ${newcity.nameCity}   succeed \n token: ${token}`)
        })
        .catch((error) => {
          return  res.status(404).send({ error: error.message })
        })
    })
    .catch((error)=>{
        return  res.status(404).send({ error: error.message })
    })
}
const getCityCode= async(req,res)=> {
    try {

        // const {cityId}=req.body
    //    const cityId=await req.params.cityId
    //    console.log(cityId);
   const city=await City.findOne({ _id: { $eq: req.params.cityId }})
    // const city=await City.findOne({ _id: cityId })
    console.log(city);
     const name=city.nameCity
       console.log(name);//https://openweathermap.org/find?q=Jerusalem&appid=$%7BapiKey%7D//https://openweathermap.org/find?q=&${name}&appid=${apiKey}
       const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`);
       const cityData = response.data;
      console.log(cityData);
       if (cityData.count > 0) {
        const cityCode = cityData.list[0]._id;
        return cityCode;
      } else {
        console.log(cityData.count);
        console.log('City not found');
        return null;
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
// const getWeather = (req, res) => {
//     const requestApi = () => {
//         return new Promise((resolve, reject) => {
//             request(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.nameCity},&appid=29e21eb08b02f857be9490804657ae5c`,
//                 (err, res, body) => {
//                     if (err)
//                         reject(err)
//                     else
//                         resolve(body)
//                 })
//         })
//     }
//     requestApi()
//         .then((body) => {
//             const apiParameters = JSON.parse(body)
//             const newWeather = new city({
//                 nameCity: apiParameters.nameCity,
//                 // weather: apiParameters.weather.main,
//                 // description: apiParameters.weather.description,
//                 temp: kelvinToCelsius(apiParameters.main.temp),
//                 temp_min: kelvinToCelsius(apiParameters.main.temp_min),
//                 temp_max: kelvinToCelsius(apiParameters.main.temp_max),
//                 apartment: req.params.apartmentId
//             })
//             newWeather.save()
//                 .then((city) => {
//                     apartment.findByIdAndUpdate({ _id: req.params.apartmentId }, { $push: { 'weathers': city._id } }, { new: true })
//                         .then((apartment) => {
//                             res.status(200).send({ city })
//                         })
//                         .catch((error) => {
//                             res.status(400).send(error.message)
//                         })
//                 })
//                 .catch((error) => {
//                     res.status(400).send(error.message)
//                 })
//         })
//         .catch((error) => {
//             res.status(400).send(error.message)
//         })
// }
// const fetch = require('node-fetch');

// const apiKey = 'YOUR_API_KEY'; // הכנס את מפתח ה-API שלך כאן
// // const cityCode = 'CITY_CODE'; // הכנס את קוד העיר שלך כאן

// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${_id}&appid=${apiKey}&units=metric`;

// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // כאן תוכל לעשות מעשה עם נתוני מזג האוויר המתקבלים
//     })
//     .catch(error => console.error('Error fetching data:', error));


module.exports ={getAllCity,addCity,getCityCode}