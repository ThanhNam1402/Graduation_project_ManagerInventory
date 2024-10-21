import api from "../../config/axios"

export const categoryService = {

    handleGetAllCategory(parmas, body, url) {
        return api.get(`/api/categories` + url)
    },

    handleAddCategory(parmas, body, url) {
        return api.post(`/api/categories` + url, {
            ...body
        })
    },

    handleGetOneCategory(parmas, body, url) {
        return api.get(`/api/categories` + url)
    },

    handleUpdateCate(parmas, body, url) {
        return api.put(`/api/categories` + url, {
            ...body
        })
    },

    handleDelCategory(parmas, body, url) {
        return api.delete(`/api/categories` + url)
    }

}