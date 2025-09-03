import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { IRole } from "@/types/auth.type";

 export const getSidebarItems=(userRole:IRole)=>{

     console.log('userRole',userRole)

    
    switch (userRole) {
        case  role.superAdmin:
        
            
             return   [...adminSidebarItems]
             case role.user:
                     return   [...userSidebarItems]
                     case role.admin:
                     return   [...adminSidebarItems]
        
            
          
    
    
        default:
            return []
    }


 }