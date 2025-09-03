import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Booking from "@/pages/user/Booking";
import Verify from "@/pages/Verify";
import { generatesRoutes } from "@/utils/generateRoutes";

import { adminSidebarItems } from "./adminSidebarItems";
import {  userSidebarItems } from "./userSidebarItems";
import { createBrowserRouter,Navigate} from "react-router";
import withAuth from "@/utils/withAuth";
import UnAutorized from "@/pages/UnAutorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types/auth.type";




 export const router= createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            { path:'about', Component:withAuth(About)}
        ]
    },

      {
        path:'/admin',
        Component:withAuth(DashboardLayout, role.admin as TRole),
         children: [
      { index:true, element:<Navigate to='analytics' />},
     
      ...generatesRoutes(adminSidebarItems),
    ],
       
    },
     {
        path:'/user',
         Component:withAuth(DashboardLayout, role.user as TRole),
         children:[
            { index:true, element:<Navigate to='bookings' />},
            ... generatesRoutes(userSidebarItems)
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
        
    },

      {
        path:'/unauthorized',
        Component:UnAutorized
        
    }

 ])