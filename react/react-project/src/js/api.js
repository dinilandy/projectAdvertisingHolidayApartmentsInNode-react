import axios from 'axios'
const token = localStorage.getItem('token');

export const setCurrentUser = (user) => {
    return { type: 'SET_CURRENT_USER', payload: user }
}
export const setToken = (token) => {
    return { type: 'SET_TOKEN', payload: token }
}
export const isUser = (newUser) => {
    return { type: 'IS_USER', payload: newUser }
}

export const isAdvertiser = (product) => {
    return { type: 'IS_ADVERTISER', payload: product }
}
const currentUser =JSON.parse(localStorage.getItem('response'))
const getToken=()=> localStorage.getItem('token')
//כל השליפות
//כל קטגוריה
export const getAllCategory=()=>{
return axios.get(`http://localhost:3001/getAllcategory`,{headers:{'Authorization':token}})  
}
//כל הלוקחות
export const getAllClient=()=>{
return axios.get(`http://localhost:3001/getAllClient`)  
}
//כל הערים
export const getAllCity=()=>{
return axios.get(`http://localhost:3001/getAllCity`)  
}
//כל הדירות
export const getAllapartment=()=>{
return axios.get(`http://localhost:3001/getAllapartment`)  
}
//שליפת דירה לפי מפרסם
export const getByIdAdvertiser=(advertiserId)=>{
   return axios.get(`http://localhost:3001/getByIdAdvertiser/${advertiserId}`
   ,{headers:{'Authorization':token}})
}
//התחברויות
//התחברות לקוח
export const clientLogin=(email,password)=>{
return axios.get(`http://localhost:3001/clientLogin/${email}/${password}`)  
}
//התחברות מפרסם
export const advertiserLogin=(password,email)=>{
return axios.get(`http://localhost:3001/advertiserLogin/${password}/${email}`)  
}
//הרשמה 
//הרשמת לקוח
export const clientRegister=(user)=>{
   debugger
    return axios.post(`http://localhost:3001/clientRegister`,user)  
 }
 //הרשמת מפרסם
export const advertiserRegister=(user)=>{
   return axios.post(`http://localhost:3001/advertiserRegister`,user)  
}
//הוספות
//הוספת דירה
export const addApartment=(_id,newApartment)=>{
   // const currentUser =JSON.parse(localStorage.getItem('response'))
   debugger
   return axios.post(`http://localhost:3001/addapartment/${currentUser._id}`,newApartment
   ,{headers:{'Authorization':token}})
}
//הוספת עיר
export const Addcity=(City)=>{
   // const currentUser =JSON.parse(localStorage.getItem('response'))
   debugger
   console.log("function__");
   console.log(City);
    return axios.post(`http://localhost:3001/addCity/${currentUser._id}`,City
 ,{headers:{'Authorization':token}})
}
//הוספת קטגוריה
export const Addcategory=(Category)=>{
   // const currentUser =JSON.parse(localStorage.getItem('response'))
   debugger
   console.log(Category);
 return axios.post(`http://localhost:3001/addCategory/${currentUser._id}`,Category
 ,{headers:{'Authorization':token}})
}
            
//מחיקת דירה
export const deleteApartmentById=(idApartment,_id)=>{
       debugger  
   // const currentUser =JSON.parse(localStorage.getItem('response'))
   console.log("rr");
   console.log(token);
      return axios.delete(`http://localhost:3001/remove/${idApartment}/${currentUser._id}`
       ,{headers:{'Authorization':token}}
      )   
    }
//סינונים
//סינון לפי קטוגריה 
export const sortByCategory=(idCategory)=>{
   // const token = getToken();
   return axios.get(`http://localhost:3001/getByIdCategory/${idCategory}`
   ,{headers:{'Authorization':token}})
}
//סינון לפי עיר
export const sortByCity=(idCity)=>{
   // const token = getTo‚ken();
   return axios.get(`http://localhost:3001/getByIdCity/${idCity}`
   ,{headers:{'Authorization':token}})
}
//סינון לפי מספר מיטות
export const getByBedeq=(getByBed)=>{
   // const token = getToken();
   return axios.get(`http://localhost:3001/getByBedeq/${getByBed}`
   ,{headers:{'Authorization':token}}
   )
}
//סינון לפי מחיר קטן
export const getByPricesmallerthan=(price)=>{
   // const token = getToken();
   return axios.get(`http://localhost:3001/getByPricesmallerthan/${price}`
   ,{headers:{'Authorization':token}})
}
//סינון לפי מחיר גדול
export const getByPriceBigerthen=(price)=>{
   // const token = getToken();
   return axios.get(`http://localhost:3001/getByPriceBigerthen/${price}`
   ,{headers:{'Authorization':token}})
}

//עדכון
export const update=(id,newApartment)=>{
   debugger
   // const currentUser =JSON.parse(localStorage.getItem('response'))
   console.log(currentUser);
   // const token = getToken();
   console.log("id",id);
   console.log("fghj",currentUser._id);
   console.log(newApartment);
   return axios.put(`http://localhost:3001/update/${id}/${currentUser._id}`,newApartment
   ,{headers:{'Authorization':token}})
}