

import api from "../config/axios"

export const productService = {

    handleGetAllProduct(filter) {
        return api.get(`/api/products?${filter}`)
    },
    handleDelProducts(ids) {
        return api.delete(`/api/delProducts`, {
            ids: ids
        })
    },
}