import axios from 'axios';

export const setAxiosHeader = (token) => {
  if (token) {
    return (axios.defaults.headers.common['Authorization'] = token);
  }
  delete axios.defaults.headers.common['Authorization'];
};
