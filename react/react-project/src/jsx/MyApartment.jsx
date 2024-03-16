import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react";
import { AddCategory, AddCity, Addcategory, Addcity, addApartment, deleteApartmentById, getAllCategory, getAllCities, getAllCity, getAllapartment, getByIdAdvertiser, setCurrentUser, sortByCategory, sortByCity, update } from '../js/api'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button,  IconButton,  Input,  SwipeableDrawer, TextField } from "@mui/material";
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import React from 'react';
import Swal from "sweetalert2";
import "../css/addApartment.css"
import { red } from "@mui/material/colors";
const url="http://localhost:3001/";

export const MyApartment = () => { 
  const nav = useNavigate() 
  const [data, setData] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listCity, setListCity] = useState([]);
  const storedData = localStorage.getItem('response'); 
    const dataObject = JSON.parse(storedData);
    const userId = dataObject._id;
    console.log(userId);
    console.log(dataObject._id);
  useEffect(() => {      
        getByIdAdvertiser(userId)
        
                .then(response => {
                  setData(response.data.arrApartment );
                  console.log(response.data.arrApartment)
                
                })
                .catch(error => {
                  console.log("error" +error);
                });
    getAllCategory()
      .then((x) => {
        console.log(x.data);
        if (x.data != null)
          setListCategory(x.data)
      })
      .catch((e) => {
        console.log(e);
      })
      getAllCity()
      .then((x) => {
        console.log("cities:");
        setListCity(x.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
    
  const handleClickOpen = () => {
    nav("/AddApartment")
  };

const updateApartment=(id,item)=>{
  debugger
  Swal.fire({
    title: 'Update your apartment',
    html: `
    <form id="ApartmentForm">

    <label for="apartmentName">Name:</label><br>
    <input value=${item.name} type="text" id="apartmentName" name="apartmentName"><br><br>
  
    <label for="apartmentaddress">Address:</label><br>
    <input value=${item.address}  type="text" id="apartmentaddress" name="apartmentaddress"><br><br>
  
    <label for="apartmentDescription">Description:</label><br>
    <input value=${item.description} type="text" id="apartmentDescription" name="apartmentDescription"><br><br>
  
    <label for="apartmentNumBeds">Number of beds:</label><br>
    <input value=${item.numOfBed} type="text" id="apartmentNumBeds" name="apartmentNumBeds"><br><br>
  
    <label for="apartmentPrice">Price:</label><br>
    <input value=${item.price} type="text" id="apartmentPrice" name="apartmentPrice"><br><br>
  
    <label for="">additives:</label><br>
    <input value=${item.additives} type="text" id="apartmentAdditives" name="apartmentAdditives"><br><br>
  
    <Button variant="outlined" color="success" id="submitBtn"  type={'submit'} >update</Button>
  </form>
  `,
    showCancelButton: true,
    showConfirmButton: false,
  });
  document.getElementById('ApartmentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const apartmentName = document.getElementById('apartmentName').value;
    const apartmentaddress = document.getElementById('apartmentaddress').value;
    const apartmentDescription = document.getElementById('apartmentDescription').value;
    const apartmentNumBeds = document.getElementById('apartmentNumBeds').value;
    const apartmentPrice = document.getElementById('apartmentPrice').value;
    const apartmentAdditives = document.getElementById('apartmentAdditives').value;

    const Apartment = {
      _id: item._id,
      name: apartmentName,
      address: apartmentaddress,
      descreption: apartmentDescription,
      numOfBed: apartmentNumBeds,
      Additives: apartmentAdditives,
      price: apartmentPrice
    }
    debugger
    update(id,Apartment)
      .then(x => {
        console.log(x.data)
        nav("/MyApartment")
        Swal.fire({
          icon: 'success',
          title: 'your apartment was updated',
          text: ' successfully',
        });
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'update Failed',
          text: 'update failed. Please check your credentials and try again.',
        });
      })
  });
}
    const deleteApartment=(id)=>{
        debugger
        const storedData = localStorage.getItem('response');
    const dataObject = JSON.parse(storedData);
    const userId = dataObject._id;
    console.log(userId);
        debugger
        deleteApartmentById(id,userId)
        .then((x)=>{
          nav("/MyApartment")
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'The apartment has been successfully deleted',
        });
       
        })
        .catch((err)=>{
          console.log("dini");
          
        })
      } 
        //add city
  const handleAddCity = () => {
    Swal.fire({
      title: 'Add City'
      ,
      html: `
      <form  id="apartment" class="login-form">
       
      <input type="text" id="apartmentName" name="cityName" placeholder='input city Name🌆➕'><br><br>
      <button id="submitBtn" type="submit">To Add</button>
    </form>
    `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Close',
    });
    document.getElementById('apartment').addEventListener('submit', (event) => {
      event.preventDefault();
      const cityName = document.getElementById('apartmentName').value;
      const City = {
        nameCity: cityName
      }
      Addcity(City)
        .then(x => {
          console.log(x.data)
          Swal.fire({
            icon: 'success',
            title: 'Add Category',
            text: 'You have successfully Add Category!',
          });
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Login failed. Please check your credentials and try again.',
          });
        })
    });
}
      //add category 
const handleAddCategory = () => {
  
 
    Swal.fire({
      title: 'Add Category' ,color: red
      ,
      html: `
      <form id="CategoryForm"  class="login-form">
       
      <input type="text" id="apartmentName" name="categoryName" placeholder='input category Name💠➕'><br><br>
      <button id="submitBtn" type="submit">To Add</button>
    </form>
    `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Close',
    });
    document.getElementById('CategoryForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const categoryName = document.getElementById('apartmentName').value;
      const Category = {
        nameCategory: categoryName
      }
      Addcategory(Category)
        .then(x => {
          console.log(x.data)
          Swal.fire({
            icon: 'success',
            title: 'Add Category',
            text: 'You have successfully Add Category!',
          });
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Login failed. Please check your credentials and try again.',
          });
        })
    });
  }
    return<>
     <Box >
      <Drawer
        
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <List>
          {/* כפתורי הוספות */}
                <Button  onClick={handleClickOpen}>add apartment➕🏠</Button>
                <br></br><br></br>
                <Button  onClick={handleAddCategory}>add category➕💠</Button> 
                <br></br><br></br>
                <Button  onClick={handleAddCity}>add city ➕🌆</Button> 
        </List>
      </Drawer>
     </Box>
     <div className="aaa">
        {/* הצעגת הדירות של המפרסם */}
               {data && data.map((item) => 
           <div className="card">
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={item.name}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={url+item.picture}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        
       <h2>address: {item.address}</h2>
       <h2>Number of beds🛏️: {item.numOfBed}</h2>
       <h2>price💰: {item.price}</h2>  
       <h2>additives➕: {item.additives}</h2> </Typography>
       </CardContent>
       <Button size="small" onClick={(() => updateApartment(item._id,item))}><Tooltip title="update">
     🗝️🏠
    </Tooltip></Button>
    <Button size="small" onClick={(() => deleteApartment(item._id))}><Tooltip title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip></Button></Card>
     </div> 
      )}  
      </div>
     
    </>
}