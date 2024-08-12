

import api from "../config/axios"

export const fileService = {
    handleExportAll(name) {
        return api.get(`/api/export/${name}`)
    },
    handleDowloadFile(name) {
        return api.get(`/api/downloadAll/${name}`)
    }
}