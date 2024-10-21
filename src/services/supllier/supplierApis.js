
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../../config/axiosBaseQuery'
import { supplierService } from './supplier.service'

export const supplierAPIs = createApi({
    reducerPath: 'supplierAPIs',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getAllSuppliers: builder.query({
            query: () => ({
                method: supplierService.handleGetAllSuppliers,
                params: {},
                body: {},
                url: ""
            }),
            providesTags: ['suppliers']

        }),

    })
})

export const { useGetAllSuppliersQuery } = supplierAPIs
