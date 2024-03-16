import { Button, Input, TextField, bottomNavigationActionClasses } from "@mui/material"
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { advertiserLogin, clientLogin, isAdvertiser, isUser, setCurrentUser, setToken } from "../js/api";
import swal from "sweetalert";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Nav } from "./Nav";
import '../css/signIn.css'
import { useDispatch } from "react-redux";
import store from "../js/store";
export const SignIn=()=>{
   
     const [word, setWord] = useState(null);
     const [data, setData] = useState([]);
   
    const nav = useNavigate()
    const dispatch = useDispatch()

    
        const inputSearch =(event)=>{
            debugger
           
            if (event == "client"){ 
            debugger
              setWord(event)
             const email=document.getElementById('emailU').value;
              const password=document.getElementById('passU').value;
            
              clientLogin(email,password)
                .then(response => {
                  debugger

                  localStorage.clear();
                  localStorage.setItem('response',JSON.stringify(response.data))
                  var e=localStorage.getItem('response').length
                  console.log("e",e);
                  swal(`hi ${email}!`, "wellcame back", "success")   
                  dispatch(setCurrentUser(response.data.user))
                  dispatch(isUser(true))
                  dispatch(setToken(response.data.token)) 
                  nav('/Allapartment')  
                 debugger
                })
                .catch(error => {
                  console.log("error" +error);
                  // swal("error" )  
                  swal({
                    title: "This user does not exist",
                    text: "Choose one of the options:",
                    buttons: {
                      option1: {
                        text: " Register as an advertiser",
                        value: "option1",
                      },
                      option2: {
                        text: "Register as a client" ,
                        value: "option2",
                      },
                      cancel: "cancelation",
                    },
                  })
                  .then((value) => {
                    // טיפול בבחירת המשתמש
                    switch (value) {
                      case "option1":
                        swal("You have selected the option to register as an advertiser");
                        nav('/SignUp2')
                        break;
                      case "option2":
                        swal("You have selected the option to register as a client");  
                        nav('/SignUp')
                        break;
                      default:
                        swal("No option selected");
                    }
                  });
                });
        
              }
            else if (event == "advertiser"){
              setWord(event)
              const email=document.getElementById('emailU').value;
              const password=document.getElementById('passU').value;

              advertiserLogin(email,password)
             
                .then(response => { debugger
                  setData(response.data);
                  localStorage.clear();
                  localStorage.setItem('response',JSON.stringify(response.data))
                  var e=localStorage.getItem('response').length
                  console.log("e",e);
                  dispatch(setCurrentUser(response.data.advertiser))
                  dispatch(isAdvertiser(true))
                  dispatch(setToken(response.data.token)) 
                  debugger
                  console.log(store.token);

                  swal(`hi ${email}!`, "wellcame back", "success")    

                  nav('/Allapartment')          
                })
                .catch(error => {
                  console.log("error"+error);
                  swal({
                    title: "This user does not exist",
                    text: "Choose one of the options:",
                    buttons: {
                      option1: {
                        text: " Register as an advertiser",
                        value: "option1",
                      },
                      option2: {
                        text: "Register as a client" ,
                        value: "option2",
                      },
                      cancel: "cancelation",
                    },
                  })
                  .then((value) => {
                    // טיפול בבחירת המשתמש
                    switch (value) {
                      case "option1":
                        swal("You have selected the option to register as an advertiser");
                        nav('/SignUp2')
                        break;
                      case "option2":
                        swal("You have selected the option to register as a client");  
                        nav('/SignUp')
                        break;
                      default:
                        swal("No option selected");
                    }
                  });
                });
              }
              }
    return<>
     
     <div className="login">
      <h1>login</h1>
     <TextField
            autoFocus
            required
            margin="dense"            
            id="emailU"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="passU"
            name="password"
            label="password "
            type="password"
            fullWidth
            variant="standard"
          />  
            <Button className='buttenSend' onClick={(()=>inputSearch('client'))} type='click' variant="text">client</Button>
           <Button className='buttenSend' onClick={(()=>inputSearch('advertiser'))} type='click' variant="text"> advertiser</Button>
    
            <br></br>
            </div>
    </>
}