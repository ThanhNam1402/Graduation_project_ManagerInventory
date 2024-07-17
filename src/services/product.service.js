

import axios from "../axios"

export const productService = {

    handleGetAllProduct(filter) {


        return axios.get(`/api/`, {
            params: {
                filter
            }
        })
    },
}