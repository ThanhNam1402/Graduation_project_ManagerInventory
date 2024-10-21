
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../../config/axiosBaseQuery'
import { categoryService } from './category.service'

export const categoryAPIs = createApi({
    reducerPath: 'categoryAPIs',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({

        getAllCate: builder.query({
            query: () => ({
                method: categoryService.handleGetAllCategory,
                params: {},
                body: {},
                url: ""
            }),
            providesTags: ['category']

        }),

        getOneCate: builder.mutation({
            query: (id) => ({
                method: categoryService.handleGetOneCategory,
                params: {},
                body: {},
                url: `/${id}`
            }),

        }),

        addCate: builder.mutation({
            query: (body) => ({
                method: categoryService.handleAddCategory,
                params: {},
                body: body,
                url: ``
            }),
            invalidatesTags: ['category']
        }),

        updateCate: builder.mutation({
            query: (body) => ({
                method: categoryService.handleUpdateCate,
                params: {},
                body: body.data,
                url: `/${body.id}`
            }),
            invalidatesTags: ['category']
        }),

        deleteCate: builder.mutation({
            query: (id) => ({
                method: categoryService.handleDelCategory,
                params: {},
                body: {},
                url: `/${id}`

            }),
            invalidatesTags: ['category']
        }),

    })
})

export const { useGetAllCateQuery, useGetOneCateMutation, useAddCateMutation, useDeleteCateMutation, useUpdateCateMutation } = categoryAPIs
