

import api from "../config/axios"

export const supplierService = {

    handleGetAllSuppliers(filter) {
        return api.get(`/api/suppliers?${filter}`)
    },
}