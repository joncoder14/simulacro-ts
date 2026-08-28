import { createBrowserRouter } from "react-router-dom";
import PublicPages from "./pages/public/PublicPages";
import Login from "./pages/public/Login";
import MainLatyout from "./components/Mainlayout";
import { requirsAuth } from "./loaders/authLoader";
import MainDashboard from "./pages/private/MainDashboard";
import Register from "./pages/public/Register";

export const router = createBrowserRouter([{
    path:"/",
    element:<PublicPages/>,
    children:[{
        index:true,
        element:<Login/>
    },
    {
        path:"register",
        element:<Register/>
    }
],
},
{
    path:"/",
    loader:requirsAuth,
    element:<MainLatyout/>,
    children:[
        {
            path:"mainDashboard",
            element:<MainDashboard/>
        }
    ]

}

])