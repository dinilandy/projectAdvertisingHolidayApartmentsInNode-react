import { Button, Stack, TextField } from '@mui/material'
import '../css/Home.css'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { advertiserLogin, advertiserRegister, clientLogin, clientRegister, isAdvertiser, isUser, setCurrentUser, setToken } from '../js/api';
import { useDispatch, useSelector } from 'react-redux';
import store from '../js/store';
export const Home=()=>{
    const nav = useNavigate() 
    const [data, setData] = useState([]);
    const [word, setWord] = useState(null);

      const dispatch = useDispatch()
      const login = (event) => {
            debugger
            if (event == "client"){ 
            debugger
              setWord(event)
             const email=document.getElementById('emailU').value;
              const password=document.getElementById('passU').value;
            
              clientLogin(email,password)
                .then(response => {
                  debugger

                

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
             debugger                    
              advertiserLogin(email,password)
                .then(response => { 
                  setData(response.data);
                 // localStorage.clear();
                  console.log("sdfghjklkjhgf");
                 // localStorage.setImage('token',response.token)
                  console.log("1");
                  //console.log(response.token);
                //  localStorage.setItem('currentUser',JSON.stringify(response.advertiser[0]))
                //  console.log("2");
                //  console.log(JSON.stringify(response.advertiser[0]));
                const token = response.data.token; // אני מניח שה-token נמצא בתוך התשובה שקיבלת
            localStorage.setItem('token', token);
            const a = response.data.advertiser
                localStorage.setItem('response',JSON.stringify(a))
                //    console.log(v);
                //   var e=localStorage.getItem('response').length
                  console.log("e",token);
                  dispatch(setCurrentUser(a))
                  dispatch(isAdvertiser(true))
                  dispatch(setToken(token)) 
                  debugger

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
                        // history.push("/SignUp");
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
      const [openLogin, setOpenLogin] = React.useState(false);
      const [openRegisterADV, setOpenRegisterADV] = React.useState(false);
      const [openRegisterClient, setOpenRegisterClient] = React.useState(false);
      const handleClickOpenLog = () => {
        setOpenLogin(true);
      };
      const handleClickOpenAdv = () => { 
        setOpenRegisterADV(true)
       
      };
      const handleClickOpenCli = () => {
        setOpenRegisterClient(true)
      };
    
      const handleCloseLog = () => {
        setOpenLogin(false);
      };
      const handleCloseAdv = () => {
        setOpenRegisterADV(false)
      };
      const handleCloseCli = () => {
        setOpenRegisterClient(false)
      };
    // const inputSearch =(event)=>{
    //     debugger
    //     if (event == "client"){ 
    //         nav('SignUp')
    //        }
    //        else
    //        nav('SignUp2')
    //     }

        //הרשמות
        //הרשמה כלקוח כ
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
                  nav('/Allapartment')  
                //   console.log(response.data.user.email);
                swal(`hi${response.data.email} !`, "You have successfully registered!", "success")    

                  nav('/Allapartment')    
                })
                .catch(error => {
                  // טיפול בשגיאות
                  console.error("Error registering user:", error);
                  swal("שגיאה בהרשמה");  
                });
            };

            //הרשמה כמפרסם
            const registerAdvertiser = () => {
                // event.preventDefault();
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
                    swal(`hi ${response.data.email}!`, "You have successfully registered!", "success")    
                    nav('/Allapartment')    
                  })
                  .catch(error => {
                    // טיפול בשגיאות
                    console.error("Error registering user:", error);
                    swal("שגיאה בהרשמה");  
                  });
              };
          
    return<>

    <div className="homepage-container">
      
      <div className="background-section">
        {/* רקע חום עם שתי כפתורים בצד שמאל */}
        <div className="background" />
        <div className="buttons">
        <h1 className='text'>
        <h4 className='tt'>  If you have already registered then log in and continue</h4>
      <Button variant="outlined" color="success" onClick={handleClickOpenLog}>
        login
      </Button>
      _________________
      <br></br>
            Dear user, if you haven't registered yet, it's time </h1>
            <h4 className='tt'>  All you have to do is decide how to register</h4>
                                1: as
            <Button variant="outlined" color="success" type='click' onClick={handleClickOpenAdv}> advertiser</Button>
                                2: as
              <Button variant="outlined" color="success"  type='click' onClick={handleClickOpenCli}>client</Button>

              {/* <Button variant="outlined" onClick={handleClickOpenUser} type="click" value={'loginUser'} >רישום משתמש</Button> */}
              {/* <Button variant="outlined" onClick={handleClickOpen} type="click" value={'loginAdvertiser'} >רישום מפרסם</Button> */}
        <React.Fragment>
      <Dialog
        open={openLogin}
        onClose={handleCloseLog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseLog();
          },
        }}
      >
        <DialogTitle>to login</DialogTitle>
        <DialogContent>
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
            
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleCloseLog}>cancelation</Button>
    <Button variant="outlined" color="success" onClick={(() => login('client'))} type="click" value={'loginUser'} >login client</Button>
    <Button variant="outlined" color="success" onClick={(() => login('advertiser'))} type="click" value={'loginAdvertiser'} >login Advertiser</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRegisterClient}
        onClose={handleCloseCli}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseCli();
          },
        }}
      >
      <DialogTitle>Sign up as a client:</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleCloseCli}>cancelation</Button>
          <Button variant="outlined" color="success" onClick={(()=>registerClient())}  type="click" >Connect </Button>

          {/* <Button variant="outlined" onClick={registerAdvertiser} type="click">להרשמה</Button> */}
       </DialogActions>
      </Dialog>
      <Dialog
       open={openRegisterADV}
        onClose={handleCloseAdv}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseAdv();
          },
        }}
        >
         <DialogTitle>SignUp as an advertiser</DialogTitle>
        <DialogContent>
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
      
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleCloseAdv}>cancelation</Button>
<Button variant="outlined" color="success" onClick={(()=>registerAdvertiser())}  type="click" value={'loginAdvertiser' } >Connect </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
              
    </div>
      </div>
        
      <div className="image-section">
        {/* תמונה על חצי מהדף הימני */}
      <img src={`${process.env.PUBLIC_URL}/image/3.png`} ></img> 
     </div>
    </div>
    
    </>
    
}
