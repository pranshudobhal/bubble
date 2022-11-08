import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const loginService = async (userDetails) => {
  return axios.post(`${API_URL}/login`, userDetails);
};
