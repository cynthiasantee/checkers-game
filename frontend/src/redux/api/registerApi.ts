import { api } from "../../axios.config";

export interface Register {
  email: string;
  username: string;
  password: string;
}

const register = (register: Register) => {
  return api.request<string>({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/register`,
    data: register,
  });
};

export const RegisterApi = {
  register,
};
