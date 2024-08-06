import api from "../config/axios";

// export const userService = {
//     handleGetAll(email, name) {
//       return api.get(`/api/user`, {email, name});
//     }
//   };
export const userService = {
  handleGetAll(email, name) {
    return api.get(`/api/user`, {
      params: { email, name },
    });
  },
};
