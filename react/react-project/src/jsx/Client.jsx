import { useEffect, useState } from "react";
import { deleteApartmentById, getAllCategory, getAllCity, getAllapartment, getAllcategory, getByBedeq, getByPriceBigerthen, getByPricesmallerthan, sortByCategory, sortByCity } from "../js/api";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
// import '../css/client.css'
import { Button,  IconButton,  Input,  SwipeableDrawer, TextField } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import swal from "sweetalert";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CategoryIcon from '@mui/icons-material/Category';
import LocationCityIcon from '@mui/icons-material/LocationCity';

 export  const Client=()=> {
  const url="http://localhost:3001/";
  
        const Item = styled(Paper)(({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          ...theme.typography.body2,
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        }));
        const [state, setState] = React.useState({
          top: false,
          left: false,
          bottom: false,
          right: false,
        });
        const toggleDrawer = (anchor, open) => (event) => {
          if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
          ) {
            return;
          }
        
          setState({ ...state, [anchor]: open });
        };
  
        const list = (anchor) => (
          <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
          >
             <div>
             <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">city🌆</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={city}
                                onChange={handleSortCity}
                                autoWidth
                                label="city">
                               {
                                    listCity && listCity.map((item) =><MenuItem value={item._id}>{item.nameCity}</MenuItem>
                                    )}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">category💠</InputLabel>
                            <Select

                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={category}
                                onChange={handleSortCategory}
                                autoWidth
                                label="category">
                                {
                                    listCategory && listCategory.map((item) =><MenuItem value={item._id}>{item.nameCategory}</MenuItem>
                                    ) }                       
                          </Select>
                        </FormControl>

    <FormControl sx={{ m: 1, minWidth: 100 }}>
  <InputLabel htmlFor="number-input">number of bed🛏️</InputLabel>
  <Input
    id="number-input"
    type="number"
    value={bed}
    onChange={handleSortBed}
    inputProps={{ min: 1 }} // כדי להגביל את המספר המינימלי שניתן להזין
  />
</FormControl>
<FormControl sx={{ m: 1, minWidth: 100 }}>
  <InputLabel htmlFor="number-input">The cheapest price💰</InputLabel>
  <Input
    id="number-input"
    type="number"
    value={priceB}
    onChange={handleSortBPrice}
    inputProps={{ min: 1 }} // כדי להגביל את המספר המינימלי שניתן להזין
  />
</FormControl>
<FormControl sx={{ m: 1, minWidth: 100 }}>
  <InputLabel htmlFor="number-input">The expensive price💰</InputLabel>
  <Input
    id="number-input"
    type="number"
    value={priceS}
    onChange={handleSortSPrice}
    inputProps={{ min: 1 }} // כדי להגביל את המספר המינימלי שניתן להזין
  />
</FormControl>
     </div>
    </Box>
    );

          const [listCity, setListCity] = useState([]);
          const [listCategory, setListCategory] = useState([]);
          const [city, setCity] = useState();
          const [bed, setBed] = useState();
          const [priceS, setpriceS] = useState();
          const [priceB, setpriceB] = useState();
          const [category, setCategory] = useState();
          const [data, setData] = useState([]);
          
        useEffect(() => {  
          debugger    
              getAllapartment()
                  .then(response => {
                    setData(response.data);
                    console.log("zz",response.data)
                  
                  })
                  .catch(error => {
                    console.log("error" +error);
                  });
                  getAllCategory()
                  .then((x) => {
                     if (x.data != null)
                    setListCategory(x.data)
                  })
                  .catch((e) => {
                    console.log(e);
                  })
                  getAllCity()
                  .then((x) => {
                    setListCity(x.data)
                    console.log(x.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  })
                }, [])

        const handleSortCity = (event) => {
          debugger
         sortByCity(event.target.value)
         .then((x) => {
          console.log("all",x.data);
           setData(x.data)
        })
        .catch((error) => {
          console.log(error);
        })
      
        }
        const handleSortBed = (event) => {
          debugger
          getByBedeq(event.target.value)
         .then((x) => {
          console.log("all",x.data);
           setData(x.data)
        })
        .catch((error) => {
          console.log(error);
        })
        }
        const handleSortBPrice = (event) => {
          debugger
          getByPriceBigerthen(event.target.value)
         .then((x) => {
          console.log("all",x.data);
           setData(x.data)
        })
        .catch((error) => {
          console.log(error);
        })
        }
        const handleSortSPrice = (event) => {
          debugger
          getByPricesmallerthan(event.target.value)
         .then((x) => {
          console.log("all",x.data);
           setData(x.data)
        })
        .catch((error) => {
          console.log(error);
        })
        }
        const handleSortCategory = (event) => {
          debugger
        sortByCategory(event.target.value)
        .then((x) => {
          console.log(x.data);
           setData(x.data)
        })
        .catch((error) => {
          console.log(error);
        })
        }
        
    return<>
     <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
        <div className="a"> <Button onClick={toggleDrawer(anchor, true)}>
     filter <FilterAltIcon></FilterAltIcon> </Button></div> 
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
    <div className="aaa">
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
        </Typography>
        <h2>Number of beds🛏️: {item.numOfBed}</h2>
        <h2> price💰: {item.price}</h2>
       {item.cityId&&<h2> city🌆: {item.cityId.nameCity}</h2>}
       <h2>address: {item.address}</h2>  
        <h2>additives➕: {item.additives}</h2> 
             ------------------------------ 
       <h3> advertiser details</h3>
        {item.advertiserId&&<h5>📧{item.advertiserId.email}</h5>}
        {item.advertiserId&&<h5>📞{item.advertiserId.phone1}</h5>}
       </CardContent>
     </Card>
     </div> 
     )}   
   </div>
    </>
}


