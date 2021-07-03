import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const fetchUserService = async (username) => {
  return axios.get(`${API_URL}/user/${username}`);
};
