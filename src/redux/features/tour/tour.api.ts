
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
         removeTourType:builder.mutation({
            query:(tourTypeId)=>({
                url:`tour/tour-types/${tourTypeId}`,
                method:'DELETE',
                data:tourTypeId

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

        
         addTour:builder.mutation({
            query:(tourData)=>({
                url:'/tour/create',
                method:'POST',
                data:tourData

            }),
            invalidatesTags:[]
         
            
        }),
    
        
    })
})


export  const { useAddTourTypeMutation,useGetTourTypesQuery,useRemoveTourTypeMutation,useAddTourMutation} =tourApi