import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types/auth.type"
import type { ComponentType } from "react"
import { Navigate } from "react-router"

 export default function withAuth (Component:ComponentType,requiredRole?:TRole)  {


    return  function AuthWrapper(){

       const{data,isLoading} =useUserInfoQuery(null)
       

        console.log('requiredRole',requiredRole)
        console.log('roless',data?.data?.role)


       if( !isLoading && !data?.data?.email){
        return <Navigate to={'/login'} />
       }
       if( requiredRole&& !isLoading && requiredRole!==data?.data?.role){
        return <Navigate to={'/unauthorized'} />
       }
          
        return <Component/>
    }
 
};
