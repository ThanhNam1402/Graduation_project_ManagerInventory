

import api from "../../config/axios"

export const supplierService = {

    handleGetAllSuppliers(filter) {
        return api.get(`/api/suppliers?${filter}`)
    },

    handleGetComplete(keyWord) {
        return api.get(`/api/suppliers?keyword=${keyWord}`)

    },
    handleAddSupplier(data) {
        return api.post(`/api/suppliers`, {
            ...data
        })
    },
    handleGetOneSupplier(id) {
        return api.get(`/api/suppliers/${id}`)
    },
    handleUpdateSupplier(id, data) {
        return api.put(`/api/suppliers/${id}`, {
            ...data
        })
    },
    handleDeleteSupplier(id) {
        return api.delete(`/api/suppliers/${id}`)
    },
}