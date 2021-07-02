import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const signUpService = async (userDetails) => {
  return axios.post(`${API_URL}/signup`, userDetails);
};
