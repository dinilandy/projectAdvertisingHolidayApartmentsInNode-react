import { Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { advertiserRegister, isAdvertiser, setCurrentUser, setToken } from "../js/api"
import '../css/client.css'
import { useDispatch } from "react-redux"

export const SignUp2=()=>{
  let nav = useNavigate()
  const dispatch = useDispatch()

    const registerAdvertiser = () => {
    debugger
      const user = {
        email: document.getElementById('emailA').value,
        password: document.getElementById('passA').value,
        phone1:document.getElementById('phone1').value,
        phone2:document.getElementById('phone2').value
      };
      
      advertiserRegister(user)
        .then(response => {
          localStorage.clear();
                    localStorage.setItem('response',JSON.stringify(response.data))
                    var e=localStorage.getItem('response').length
                    console.log("e",e);
                    dispatch(setCurrentUser(response.data))
                    dispatch(isAdvertiser(true))
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

    return<>
   
     <div className="login">
     <h1>SignUp as an advertiser</h1>
    <form >
    <TextField
            autoFocus
            required
            margin="dense"
            id="emailA"
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
            id="passA"
            name="password"
            label="password"
            type="password"
            fullWidth
            variant="standard"
          />
                <TextField
            autoFocus
            required
            margin="dense"
            id="phone1"
            name="phone1"
            label="phone1"
            type="phone1"
            fullWidth
            variant="standard"
          />
                <TextField
            autoFocus
            required
            margin="dense"
            id="phone2"
            name="phone2"
            label="phone2"
            type="phone2"
            fullWidth
            variant="standard"
          />
      <br></br>
      <br></br>
      <Button variant="outlined" onClick={(()=>registerAdvertiser())}  type="click" value={'loginAdvertiser' } >send </Button>
      <br></br>
    </form></div>
    </>
}