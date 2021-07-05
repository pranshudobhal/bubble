import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const getAllPostsService = async () => {
  return axios.get(`${API_URL}/post`);
};

export const createNewPostService = async (newPost) => {
  return axios.post(`${API_URL}/post`, newPost);
};

export const deletePostService = async (postID) => {
  return axios.delete(`${API_URL}/post/${postID}`);
};

export const reactionAddedService = async ({ postID, reaction, userID }) => {
  return axios.post(`${API_URL}/post/${postID}/${reaction}`, {
    userID,
  });
};

export const reactionRemovedService = async ({ postID, reaction, userID }) => {
  return axios.delete(`${API_URL}/post/${postID}/${reaction}`, {
    data: {
      userID,
    },
  });
};
