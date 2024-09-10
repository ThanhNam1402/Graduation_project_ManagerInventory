import api from "../config/axios"

export const categoryService = {
    handleGetAllCate() {
        return api.get(`/api/categories`)
    },
    handleAddCate(data) {
        return api.post(`/api/categories`, {
            ...data
        })
    },
    handleGetOneCate(id) {
        return api.get(`/api/categories/${id}`)
    },
    handleUpdateCate(id, data) {
        return api.put(`/api/categories/${id}`, {
            ...data
        })
    },
    handleDelCate(id) {
        return api.delete(`/api/categories/${id}`)
    }

}