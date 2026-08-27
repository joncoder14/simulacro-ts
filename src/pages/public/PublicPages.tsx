import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function PublicPages (){
    const {isAuthenticated} = useAuth()
    return isAuthenticated? <Navigate to={"/mainDashboard"}/>: <Outlet/>
}

export default PublicPages