

import api from "../config/axios"

export const purchaseOrderService = {

    handleGetAllPurchaseorders(filter) {
        return api.get(`/api/purchaseorders?${filter}`)
    },
    handleGetOrderProducts(id) {
        return api.get(`/api/purchaseorders/detail/${id}`)
    },
    handleGetComplete(keyWord) {
        return api.get(`/api/purchaseorders/autocomplete?keyword=${keyWord}`)
    },
    handleAddPurChaseOrder(dataPurChase, dataDetail) {
        return api.post(`/api/purchaseorders/new`, {
            dataPurChase: dataPurChase,
            dataDetail: dataDetail
        })

    }



}