import type { ComponentType } from "react";

export interface ISendOtp{
    email:string;
}
export interface IVerifyOtp{
    email:string;
    otp:string;
}



export interface ISidebarItem{
    title:string;
    items:{
        title:string;
        url:string;
        component:ComponentType
    }[]
}


export type TRole='SUPER_ADMIN'|'ADMIN'|'USER'


