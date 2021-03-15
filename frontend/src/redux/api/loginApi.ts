import { api } from "../../axios.config";

export interface Login {
  username: string;
  password: string;
}

const login = (login: Login) => {
  return api.request<string>({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/login`,
    data: login,
  });
};

export const LoginApi = {
  login,
};
