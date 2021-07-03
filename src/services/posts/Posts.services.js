import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const getAllPosts = async () => {
  return axios.get(`${API_URL}/post`);
};

export const createNewPost = async (newPost) => {
  return axios.post(`${API_URL}/post`, newPost);
};

export const deletePost = async (postID) => {
  return axios.delete(`${API_URL}/post/${postID}`);
};
