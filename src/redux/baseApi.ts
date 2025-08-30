

import { config } from '@/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery: fetchBaseQuery({ baseUrl:  config.baseUrl}),
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({})
  
})