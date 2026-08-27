import { createBrowserRouter } from "react-router-dom";
import PublicPages from "./pages/public/PublicPages";
import Login from "./pages/public/Login";
import MainLatyout from "./components/Mainlayout";
import { requirsAuth } from "./loaders/authLoader";
import MainDashboard from "./pages/private/MainDashboard";

export const router = createBrowserRouter([{
    path:"/",
    element:<PublicPages/>,
    children:[{
        index:true,
        element:<Login/>
    }],
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