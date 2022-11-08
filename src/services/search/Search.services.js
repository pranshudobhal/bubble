import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const fetchAllUsersService = async () => {
  return axios.get(`${API_URL}/user/allUsers`);
};
