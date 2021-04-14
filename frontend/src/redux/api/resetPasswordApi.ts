import { api } from "../../axios.config";

export interface ResetPassword {
  email: string;
  password: string;
}

const resetPassword = (resetPassword: ResetPassword) => {
  return api.request<string>({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `/update`,
    data: resetPassword,
  });
};

export const resetPasswordApi = {
  resetPassword,
};
