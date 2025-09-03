
import type { ISidebarItem } from "@/types/auth.type";
import { Component } from "react";


 export const generatesRoutes= (sidebarItems:ISidebarItem[])=>{
    return sidebarItems.flatMap((secttion) => secttion.items.map((route) => ({ path: route.url, Component: route.component })))

 }