import axios from 'axios';
import { config } from 'dotenv';

config();

export const login = async ({ email, password }) => {
  const { data } = await axios.post(`${process.env.SERVER_URL}/v1/sessions`, {
    email,
    password,
  });
  return `Bearer ${data.token}`;
};
