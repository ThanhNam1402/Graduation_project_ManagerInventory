import api from "../config/axios";

export const invertoryService = {
  handleGetAll(page) {
    return api.get(`/api/checkstock?page=${page}`);
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
    return api.delete(`/api/invertory/${id}`);
  },

  handleCreatInventoryDetail(data) {
    return api.post(`/api/invertorydetail`, {
      ...data,
    });
  },
};
