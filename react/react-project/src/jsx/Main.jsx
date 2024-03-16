import { BrowserRouter } from "react-router-dom"
import { Routing } from "./Routing"
import { Nav } from "./Nav"
import { Provider } from "react-redux"
import store from "../js/store"


export const Main=()=>{
    return<>
 <Provider store={store}>
    <BrowserRouter>
            <Nav></Nav>
            <Routing></Routing>
        </BrowserRouter>
        </Provider>
    </>
}