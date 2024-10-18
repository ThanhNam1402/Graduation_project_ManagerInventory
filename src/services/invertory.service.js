import api from "../config/axios";

export const invertoryService = {
  handleGetAll(page, limit, status) {
    const query = status ? `status=${status}` : `status=`;
    return api.get(`/api/checkstock?page=${page}&limit=${limit}&${query}`);
  },
  handleGetOne(id) {
    return api.get(`/api/checkstock/${id}`);
  },
  hendleCreat(data) {
    return api.post(`/api/checkstock/create`, {
      ...data,
    });
  },
  handleDelInvertory(id) {
    return api.delete(`/api/checkstock/delete/${id}`);
  },

  handleUpdate(id, data) {
    return api.put(`/api/checkstock/update/${id}`, {
      ...data,
    });
  },
};
