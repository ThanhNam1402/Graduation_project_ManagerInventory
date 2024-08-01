

import api from "../config/axios"

export const purchaseOrderService = {

    handleGetAllPurchaseorders(filter) {
        return api.get(`/api/purchaseorders?${filter}`)
    },
}