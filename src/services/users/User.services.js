import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const fetchUserService = async (username) => {
  return axios.get(`${API_URL}/user/${username}`);
};

export const followButtonClickedService = async (userToFollowID) => {
  return axios.post(`${API_URL}/user/follow/${userToFollowID}`);
};

export const unFollowButtonClickedService = async (userToUnfollowID) => {
  return axios.delete(`${API_URL}/user/follow/${userToUnfollowID}`);
};

export const initializeLoggedInUserService = async () => {
  return axios.get(`${API_URL}/user`);
};
