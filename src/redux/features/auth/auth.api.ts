
import { baseApi } from '@/redux/baseApi'




export const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

        register:builder.mutation({
            query:(userInfo)=>({
                url:'/user/register',
                method:'POST',
                body:userInfo

            })
        })
        
    })
})


export  const { useRegisterMutation} =authApi