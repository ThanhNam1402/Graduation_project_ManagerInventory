

import api from "../config/axios"

export const categoryService = {
    handleGetAllCate() {
        return api.get(`/api/categories`)
    },

}