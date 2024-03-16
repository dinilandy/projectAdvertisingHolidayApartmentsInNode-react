const express =require('express')
const router =express.Router()

const clientController=require('../controllers/client')
const advertiserController=require('../controllers/advertiser')
const categoryController=require('../controllers/category')
const cityController=require('../controllers/city')
const apartmentController=require('../controllers/apartment')
const {upload, checkAuth}=require('../../middlewares')
router.get('/',(req,res)=>{
    res.send('dini')
})
 
router.post('/clientRegister',clientController.clientRegister)
router.get('/clientLogin/:email/:password',clientController.clientLogin)
router.get('/getAllClient',clientController.getAllClient)

router.post('/advertiserRegister',advertiserController.advertiserRegister)
router.get('/advertiserLogin/:email/:password',advertiserController.advertiserLogin)
router.get('/getAllAdv',advertiserController.getAllAdv)
router.get('/getApartments/:idAdvertiser',advertiserController.getApartmentsByAdvertiser)

router.post('/addCity/:advertiserId',checkAuth,cityController.addCity)
router.get('/getAllCity',cityController.getAllCity)
router.get('/getWeather/:cityId',cityController.getCityCode)


router.post('/addCategory/:advertiserId',checkAuth,categoryController.addCategory)
router.get('/getAllcategory',categoryController.getAllcategory)

router.post('/addapartment/:advertiserId',checkAuth,upload.single('picture') ,apartmentController.addApartment)
router.get('/getAllapartment',apartmentController.getAllapartment)
router.get('/getById/:id',apartmentController.getById)
router.get('/getByIdCategory/:idCategory',apartmentController.getByIdCategory)
router.get('/getByIdCity/:idCity',apartmentController.getByIdCity)
router.get('/getByBedBigerthen/:numOfBed',checkAuth,apartmentController.getByBedBigerthen)
router.get('/getByBedeq/:numOfBed',checkAuth,apartmentController.getByBedeq)
router.get('/getByBedsmallerthan/:numOfBed',checkAuth,apartmentController.getByBedsmallerthan)
router.get('/getByPriceeq/:price',checkAuth,apartmentController.getByPriceeq)
router.get('/getByPriceBigerthen/:price',checkAuth,apartmentController.getByPriceBigerthen)
router.get('/getByPricesmallerthan/:price',checkAuth,apartmentController.getByPricesmallerthan)
router.get('/getByIdAdvertiser/:advertiserId',apartmentController.getByIdAdvertiser)
router.put('/update/:id/:advertiserId',checkAuth,apartmentController.update)
router.delete('/remove/:id/:advertiserId',checkAuth,apartmentController.remove) 

module.exports=router

