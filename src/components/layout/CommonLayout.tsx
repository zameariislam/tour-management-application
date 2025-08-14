import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";



interface IProps{
    children:ReactNode
}

 export default function CommonLayout ({children}:IProps)  {
  return (
    <div className="flex flex-col min-h-screen">
  
         <Navbar/>


         <div   className="grow-1">
             {children}
         </div>
   
 
    
 
    
    <Footer/>
    </div>
  
  );
};
