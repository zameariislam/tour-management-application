
import { baseApi } from '@/redux/baseApi'
import type { IResponse } from '@/types'
import type { ISendOtp, IVerifyOtp } from '@/types/auth.type'





export const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

        register:builder.mutation({
            query:(userInfo)=>({
                url:'/user/register',
                method:'POST',
                data:userInfo

            })
        }),
         login:builder.mutation({
            query:(userInfo)=>({
                url:'/auth/login',
                method:'POST',
                data:userInfo

            })
        }),
         sendOtp:builder.mutation<IResponse<null>,ISendOtp> ({
            query:(userInfo)=>({
                url:'/otp/send',
                method:'POST',
                data:userInfo

            })
        }),

         verifyOtp:builder.mutation<IResponse<null>,IVerifyOtp> ({
            query:(userInfo)=>({
                url:'/otp/verify',
                method:'POST',
                data:userInfo

            })
        }),
        
    })
})


export  const { useRegisterMutation,useLoginMutation,useSendOtpMutation,useVerifyOtpMutation} =authApi