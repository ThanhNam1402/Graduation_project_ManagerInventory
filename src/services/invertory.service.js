import api from "../config/axios";

export const invertoryService = {
  handleGetAll(filter) {
    return api.get(`/api/invertory?${filter}`);
  },
  hendleCreat(data) {
    return api.post(`/api/invertory`, {
      ...data,
    });
  },

  handleGetCode() {
    return api.get(`/api/invertory/code`);
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
