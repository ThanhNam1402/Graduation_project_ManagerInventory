import { configureStore } from '@reduxjs/toolkit'

import { categoryAPIs } from "./services/category/categoryApis"
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
    reducer: {
        [categoryAPIs.reducerPath]: categoryAPIs.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryAPIs.middleware),
})

setupListeners(store.dispatch)