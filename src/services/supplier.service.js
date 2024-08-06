

import api from "../config/axios"

export const supplierService = {

    handleGetAllSuppliers(filter) {
        return api.get(`/api/suppliers?${filter}`)
    },

    handleGetComplete(keyWord) {
        return api.get(`/api/suppliers/autocomplete?keyword=${keyWord}`)
    }
}