import axios from 'axios';

export const loginApi = async (userInput: { [k: string]: FormDataEntryValue }) => {
  const response = await axios.post('/login', userInput);
  return response.data;
};

export const authApi = async (userId: string) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};

export const getProductsApi = async (page = 1, size = 10) => {
  const response = await axios.get(`http://localhost:8000/products?page=${page}&size=${size}`);
  return response.data;
};

export const getProductByIdApi = async (id: number) => {
  const response = await axios.get(`http://localhost:8000/products/${id}`);
  return response.data;
};
