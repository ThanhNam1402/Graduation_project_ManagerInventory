const axiosBaseQuery = async ({ method, parmas, body, url }) => {
    try {
        const response = await method(parmas, body, url,)
        return { data: response }
    } catch (axiosError) {
        const err = axiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}

export default axiosBaseQuery