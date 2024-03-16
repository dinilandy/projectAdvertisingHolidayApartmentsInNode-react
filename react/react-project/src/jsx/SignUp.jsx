import { Button, TextField } from "@mui/material"
import swal from "sweetalert"
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { clientRegister, isUser, setCurrentUser, setToken } from "../js/api"
import '../css/client.css'
import { useDispatch } from "react-redux";

export const SignUp=()=>{
    let parms = useParams()
    const { e } = parms
    const [word, setWord] = useState(null);
    const [data, setData] = useState([]);
    const emailRef=useRef()
    const passRef=useRef()
    let nav = useNavigate()
    const dispatch = useDispatch()

    const registerClient = () => {
      debugger
        const user = {
          email:document.getElementById('emailU').value,
            password:document.getElementById('passU').value
        };
        clientRegister(user)
          .then(response => {
            debugger
            localStorage.clear();
                    localStorage.setItem('response',JSON.stringify(response.data))
                    var e=localStorage.getItem('response').length
                    console.log("e",e);
                    dispatch(setCurrentUser(response.data))
                    dispatch(isUser(true))
                    dispatch(setToken(response.data.token)) 
            swal("You have successfully registered!","success");     
            nav('/Allapartment')    
          })
          .catch(error => {
            // טיפול בשגיאות
            console.error("Error registering user:", error);
            swal("שגיאה בהרשמה");  
          });
      };

        //בודק אם המייל והסיסמא שונים
    //     if (event.target[2].value != event.target[4].value) {
    //       const user = {
    //         name: event.target[0].value,
    //         email: event.target[2].value,
    //         password: event.target[4].value
    //       }
    //       swal(`שלום ${user.name}!`, "נרשמת בהצלחה למערכת", "success")
    //       nav('/Home')
    //     }
    //     else
    //       swal('the email and passwors same')
    
    
    return<>
     
     <div className="login">
     <h1>Sign up as a client:</h1>
    <form >
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
      <br></br>
      <br></br> 
      <Button variant="outlined" onClick={(()=>registerClient())}  type="click" >send </Button>

      <br></br>
    </form>
    </div>
  </>
   
} 