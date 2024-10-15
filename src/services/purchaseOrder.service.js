

import api from "../config/axios"

export const purchaseOrderService = {

    handleGetAllPurchaseorders() {
        return api.get(`/api/import-goods`)
    },

    handleGetOnePurchaseorders(id) {
        return api.get(`/api/purchaseorders/one/${id}`)
    },

    handleGetOrderProducts(id) {
        return api.get(`/api/purchaseorders/detail/${id}`)
    },

    handleGetAllProduct(keyword) {
        return api.get(`/api/products?page=1&rowsperpage=10&keyword=${keyword}`)
    },

    handleAddPurChaseOrder(data) {
        return api.post(`/api/import-goods`, {
            ...data
        })
    }


}