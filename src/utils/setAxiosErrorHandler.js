import axios from 'axios';
import { logoutUser } from '../features/authentication/authenticationSlice';

export const setAxiosErrorHandler = (dispatch) => {
  const FORBIDDEN = 403;
  const UNAUTHORIZED = 401;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === FORBIDDEN || error?.response?.status === UNAUTHORIZED) {
        dispatch(logoutUser());
      }
      return Promise.reject(error);
    }
  );
};
