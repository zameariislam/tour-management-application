
import { baseApi } from '@/redux/baseApi'






 export const tourApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

      
         addTourType:builder.mutation({
            query:(tourTypeName)=>({
                url:'tour/create-tour-type',
                method:'POST',
                data:tourTypeName

            }),
            invalidatesTags:['Tour']
         
            
        }),
        
        
         getTourTypes:builder.query({
            query:()=>({
                url:'/tour/tour-types',
                method:'GET',
              

            }),
            transformResponse:(response)=>response.data,
            providesTags:['Tour']
        }),
    
        
    })
})


export  const { useAddTourTypeMutation,useGetTourTypesQuery} =tourApi