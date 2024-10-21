

import api from "../../config/axios"

export const customerService = {

    handleGetAllCustomers(filter) {
        return api.get(`/api/customers?${filter}`)
    },
    handleGetComplete(keyWord) {
        return api.get(`/api/customers/autocomplete?keyword=${keyWord}`)
    },
    handleAddCustomer(data) {
        return api.post(`/api/customers`, {
            ...data
        })
    },
    handleGetOneCustomer(id) {
        return api.get(`/api/customers/${id}`)
    },
    handleUpdateCustomer(id, data) {
        return api.put(`/api/customers/${id}`, {
            ...data
        })
    },
    handleDeleteCustomer(id) {
        return api.delete(`/api/customers/${id}`)
    },
}