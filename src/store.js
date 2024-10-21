import { configureStore } from '@reduxjs/toolkit'

import { categoryAPIs } from "./services/category/categoryApis"
import { supplierAPIs } from "./services/supllier/supplierApis"
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
    reducer: {
        [categoryAPIs.reducerPath]: categoryAPIs.reducer,
        [supplierAPIs.reducerPath]: supplierAPIs.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryAPIs.middleware, supplierAPIs.middleware),
})

setupListeners(store.dispatch)