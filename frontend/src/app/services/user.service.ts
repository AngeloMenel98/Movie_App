import api from "@/lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (email: string, password: string) => {
  const payload: LoginPayload = { email, password };

  const res = await api.post('/users/login', payload);
  return res.data;
};