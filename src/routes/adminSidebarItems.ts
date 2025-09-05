
// import Analytics from "@/pages/Admin/Analytics";

// import Analytics from "@/pages/Analytics";
import AddDivision from "@/pages/admin/AddDivision";
import AddTour from "@/pages/admin/AddTour";
import AddTourTypes from "@/pages/admin/AddTourTypes";

import type { ISidebarItem } from "@/types/auth.type";
import { lazy } from "react";


const Analytics=lazy(()=>import("@/pages/Analytics"))


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourTypes,
      },
       {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
      
      
    ],
  },
];