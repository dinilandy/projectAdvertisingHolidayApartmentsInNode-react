// import { Avatar, Stack } from "@mui/material"
// import { NavLink } from "react-router-dom"
// import { Client } from "./Client"

import { Avatar, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import '../css/client.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
    
export const Nav = () => {
    const currentUser = useSelector(x=> x.currentUser)
    const isAdvertiser = useSelector(x=> x.isAdvertiser)
    const isUser = useSelector(x=> x.isUser)
    //localStorage.setItem('response',JSON.stringify(response.data))
    const storedData = localStorage.getItem('response');
    const dataObject = JSON.parse(storedData);
        // const userId = dataObject.advertiser._id;
    console.log();
    return <>
       
        <div className={'nav'}>
        
            <NavLink  to='/' className={'link'} ></NavLink>
           {((isAdvertiser==null||isAdvertiser==false)&&(isUser==null||isUser==false)
          
           )&&<NavLink to='Home' className={'link'} >Home To Connect</NavLink>}
            <NavLink to='Allapartment' className={'link'} >OUR APARTMENT</NavLink> 
            { isAdvertiser==true && <NavLink to='MyApartment' className={'link'}>My apartments</NavLink>}            
                 <Stack direction="row" spacing={4} > 
                 {  isAdvertiser==true ?
                 <Avatar  sx={{ bgcolor: 'rgba(194, 89, 3, 0.457)',width:50,height:50,fontSize:15}}>{'advertiser'.slice(0, 3)}  </Avatar> :
                 isUser==true  ?
                 <Avatar  sx={{ bgcolor: 'rgba(194, 89, 3, 0.457)',width:50,height:50,fontSize:15}}>{'client'.slice(0, 6)}  </Avatar> :
                         <Avatar src="/broken-image.jpg" /> 
                         }
                        
                          {currentUser&&<h6>{currentUser.email}</h6>}  
                 </Stack>  
             
        </div>
    </>
}