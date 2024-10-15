

import api from "../config/axios"

export const optionService = {

    handleGetAllOption() {
        return api.get(`/api/option`)
    },

    handleGetOneProduct(id, idSku) {
        return api.get(`/api/products/${id}/${idSku}`)
    },

    handleNewOption(name) {
        return api.post(`/api/option`, {
            ...name
        })
    },

    handleUpdateOption(data, id) {
        console.log(data);
        return api.put(`/api/option/${id}`, {
            ...data
        })
    },

    handleDelOption(id) {
        return api.delete(`/api/option/${id}`)
    },

}