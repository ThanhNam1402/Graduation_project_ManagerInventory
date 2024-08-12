

import api from "../config/axios"

export const productService = {

    handleGetAllProduct(filter) {
        return api.get(`/api/products?${filter}`)
    },
    handleGetOneProduct(id) {
        return api.get(`/api/products/${id}`)
    },
    handleNewProducts(data) {

        console.log(data);
        return api.post(`/api/products/new`, {
            ...data
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    handleUpdateProducts(data, id) {
        console.log(data);
        return api.put(`/api/products/${id}`, {
            ...data
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    handleDelProducts(id) {
        return api.delete(`/api/products/${id}`)
    },

    handleDelListProducts(ids) {
        return api.delete(`/api/products/list/`, {
            ids: ids
        })
    },

   
}