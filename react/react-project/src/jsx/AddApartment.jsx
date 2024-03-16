import { useEffect, useState } from "react"
import {  addApartment, getAllCategory, getAllCity, sortByCategory, sortByCity } from '../js/api'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Input, TextField } from "@mui/material";
import * as React from 'react';
import "../css/addApartment.css"
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddApartment = () => {
    const [city, setCity] = useState()
    const [cityCode, setCityCode] = useState()
    const [category, setCategory] = useState()
    const [categoryId, setCategoryId] = useState()
    const [image, setImage] = useState()
    const nav = useNavigate() 

      useEffect(() => {
        getAllCategory()
            .then(x => {

                setCategory(x.data);
                console.log(category);
            })
            .catch(err => {
                console.log("error", err);
            })
   
        getAllCity()
            .then(x => {
                console.log(x.data);
                setCity(x.data)
                console.log(city);
            })
            .catch(x => {
                console.log(x);
            })
     },[])
    const handleChange = (event) => {
        debugger
        console.log("event==", event.target.value);
        sortByCity(event.target.value)
            .then((x) => {
                setCityCode(event.target.value)
            })
            .catch((err) => {
                // debugger
                console.log("err==", err);
            })
    };
    const handleChanges = (event) => {
        debugger
        sortByCategory(event.target.value)
            .then((x) => {
                console.log("event==", event.target.value);
                setCategoryId(event.target.value)
            })
            .catch((err) => {
                // debugger
                console.log("err==", err);
            })

    };
    const AddImage = (event) => {
        setImage(event.target.files[0])

    }
    const send = (event) => {
        debugger
        event.preventDefault()
        
        const storedData = localStorage.getItem('response');
        const dataObject = JSON.parse(storedData);
        const userId = dataObject._id;

        const formData =  new FormData();
        formData.append('name', event.target[0].value);
        formData.append('description', event.target[1].value);
        formData.append('picture', image);
        formData.append('categoryId', categoryId);
        formData.append('cityId', cityCode);
        formData.append('address', event.target[7].value);
        formData.append('numOfBed', event.target[8].value);
        formData.append('additives', event.target[9].value);
        formData.append('price', event.target[10].value);
        formData.append('advertiserId',userId );

        console.log("formData", formData.get('picture'));
        console.log("data11",formData);
        
        addApartment(userId,formData)
            .then(x => {
                 nav("/MyApartment")
                Swal.fire({
                    icon: "success",
                    title: "Success!!",
                    text: "The apartment has been successfully added",
                });
                console.log(x);
            })
            .catch(err => {
              debugger
             
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The system failed to add the apartment, try again and/or make sure you are connected",
                });
            })
    }

  return <>
  <div className="abc">
   <form onSubmit={(e) => send(e)}>
                    <Box className="form" sx={{ '& > :not(style)': { m: 1 } }}>
                    <h1>   Add Apartment</h1> 
                        {/* name */}
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">name apartment📛</InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                            />
                          
                        </FormControl>  <br></br>
                        {/* description */}
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                            description📃
                            </InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                />
                        </FormControl>
                        <br></br>
                        <br></br>
                        {/* תמונה */}
                        <Input type="file" onChange={AddImage}>Upload a photo🖼️</Input>
                       <br></br>
                    <br></br> 

                        {/* קטגוריה */}
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">category💠</InputLabel>
                            <Select

                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={category}
                                onChange={handleChanges}
                                autoWidth
                                label="category">
                                {category && category.map((item) =><MenuItem value={item._id}>{item.nameCategory}</MenuItem>) }                       
                          </Select>
                        </FormControl>
                        {/* city */}
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">city🌆</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={city}
                                onChange={handleChange}
                                autoWidth
                                label="city">
                               { city && city.map((item) =><MenuItem value={item._id}>{item.nameCity}</MenuItem> )}
                            </Select>
                        </FormControl>
                        {/* adress */}
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                address🏠
                                </InputLabel>
                                <Input  />
                            </FormControl>
                        </Box>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <TextField
                            id="filled-number"
                            label="Number of bed🛏️"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
          </FormControl>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                additives➕
                                </InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                   />
                            </FormControl>
                        </Box>
                        <TextField
                            id="filled-number"
                            label="price💰"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />

                       
                        <br></br>
<Button variant="outlined" color="success"   type={'submit'} >add the apartment </Button>
                         
                    </Box>
                </form>
                <br></br>
                <br></br>
                </div>
  </>
}