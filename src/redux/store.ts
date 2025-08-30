import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
import { setupListeners } from '@reduxjs/toolkit/query'
// ...

export const store = configureStore({
  reducer: { 
    [baseApi.reducerPath]:baseApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
   
     
     
})

setupListeners(store.dispatch)

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store