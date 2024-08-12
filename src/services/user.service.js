import api from "../config/axios";

export const userService = {
  handleGetAll(email, name) {
    return api.get(`/api/user`, {
      params: { email, name },
    });
  },
  getUserInfo(email) {
    return api.get(`/api/auth/userinfo?email=${email}`,);
  },
};
