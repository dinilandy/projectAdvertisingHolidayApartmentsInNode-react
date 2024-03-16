import { Route, Routes } from "react-router-dom"
import { Client } from "./Client"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"
import { SignUp2 } from "./SignUp2"
import { Home } from "./Home"
import { MyApartment } from "./MyApartment"
import { AddApartment } from "./AddApartment"
export const Routing=()=>{
    return<>
    <Routes>
    <Route path={'/'} element={<Home></Home>}></Route>
    <Route path={'Home'} element={<Home></Home>}></Route>
   <Route path={'Allapartment'} element={<Client></Client>}></Route>
   <Route path={'SignIn'} element={<SignIn></SignIn>}></Route>
   <Route path={'SignUp'} element={<SignUp></SignUp>}></Route>
   <Route path={'SignUp2'} element={<SignUp2></SignUp2>}></Route>
  
   <Route path={'MyApartment'} element={<MyApartment></MyApartment>}></Route> 
   <Route path={'AddApartment'} element={<AddApartment></AddApartment>}></Route> 


    </Routes>
    </>
}