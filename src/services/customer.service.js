

import api from "../config/axios"

export const customerService = {

    handleGetAllCustomers(filter) {
        return api.get(`/api/customers?${filter}`)
    },
}