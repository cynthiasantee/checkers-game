import { api } from "../../axios.config";

const logout = () => {
  return api.get<string>(`/logout`);
};

export const LogoutApi = {
  logout,
};
