import { Outlet } from "react-router-dom"
import Header from "./Header"

function MainLatyout (){
    return (
        <>
          <Header/>
          <Outlet/>
        </>
    )
}

export default MainLatyout