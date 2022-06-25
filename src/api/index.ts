import axios from 'axios';

export const loginApi = async (userInput: { [k: string]: FormDataEntryValue }) => {
  const response = await axios.post('/login', userInput);
  return response.data;
};
