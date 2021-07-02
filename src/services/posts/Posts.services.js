import axios from 'axios';
import { API_URL } from '../../utils/constants';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MGRmMmYxMGRiZDY0MTA1MzQ5YWYxYTMiLCJpYXQiOjE2MjUyMzkzMTIsImV4cCI6MTYyNTMyNTcxMn0.eGczaRBfOsJQs9zPqssXKG8GoMVKvsRb5sBHvSJjG7o';

// export const getAllPosts = async () => {
//   return axios.get(`${API_URL}/post`, {
//     headers: {
//       authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MGRmMmYxMGRiZDY0MTA1MzQ5YWYxYTMiLCJpYXQiOjE2MjUyMzkzMTIsImV4cCI6MTYyNTMyNTcxMn0.eGczaRBfOsJQs9zPqssXKG8GoMVKvsRb5sBHvSJjG7o',
//     },
//   });
// };
export const getAllPosts = async () => {
  return axios.get(`${API_URL}/post`, {
    headers: {
      authorization: token,
    },
  });
};

export const createNewPost = async (newPost) => {
  return axios.post(`${API_URL}/post`, newPost, {
    headers: {
      authorization: token,
    },
  });
};

export const deletePost = async (postID) => {
  return axios.delete(`${API_URL}/post/${postID}`, {
    headers: {
      authorization: token,
    },
  });
};
