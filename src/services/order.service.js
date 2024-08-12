import api from "../config/axios";

export const orderService = {
  handleGetAll(filter) {
    return api.get(`/api/order?${filter}`);
  },
  hendleCreat(data) {
    return api.post(`/api/order`, {
      ...data,
    });
  },

  handleGetCode() {
    return api.get(`/api/order/code`);
  },

  handleDelOrder(id) {
    return api.delete(`/api/order/${id}`);
  },

  handleCreatOrderDetail(data) {
    return api.post(`/api/orderdetail`, {
      ...data,
    });
  },

  handleUpdateStastus(id, status) {
    return api.put(`/api/order/${id}`, {
      status: status
    })
  }
};
