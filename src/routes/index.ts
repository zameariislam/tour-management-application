import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";



 export const router= createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            { path:'about', Component:About}
        ]
    },

      {
        path:'/admin',
        Component:AdminLayout,
         children:[
            { path:'analytics', Component:Analytics}
        ]
       
    },
       {
        path:'/register',
        Component:Register,
        
    },
    {
        path:'/login',
        Component:Login
        
    },
    {
        path:'/verify',
        Component:Verify
        
    }

 ])