import axios from 'axios';

export const loginApi = async (userInput: { [k: string]: FormDataEntryValue }) => {
  const response = await axios.post('/login', userInput);
  return response.data;
};

export const authApi = async (userId: string) => {
   const response = await axios.get(`/users/${userId}`);
   return response.data
};
