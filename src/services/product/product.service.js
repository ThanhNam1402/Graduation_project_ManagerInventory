

import api from "../../config/axios"

export const productService = {

    handleGetAllProduct(filter) {
        return api.get(`/api/products?${filter}`)
    },
    handleGetOneProduct(id, idSku) {
        return api.get(`/api/product/${id}/${idSku}`)
    },

    handleNewProducts(data) {
        return api.post(`/api/product/create`, {
            ...data
        })
    },
    handleUploadFile(idSku, file) {
        return api.post(`/api/upload-file`, {
            sku_id: idSku,
            file: file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    handleUpdateProduct(id, idSku, data) {
        console.log(data);
        return api.put(`/api/product/update/${id}/${idSku}`, {
            ...data
        })
    },

    handleDelProducts(id) {
        return api.delete(`/api/product/delete/${id}`)
    },

    handleDelListProducts(ids) {
        return api.delete(`/api/products/list/`, {
            ids: ids
        })
    },


}