import React, { useEffect } from 'react';
import './App.css';
import { Navbar, Home, SinglePostPage, UserPage, Login, SignUp } from './features';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './features/authentication/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { setAxiosHeader } from './utils/setAxiosHeader';
import { setAxiosErrorHandler } from './utils/setAxiosErrorHandler';
import { fetchPosts } from './features/posts/postsSlice';
import { fetchAllUsers } from './features/search/searchSlice';
import { initializeLoggedInUser } from './features/authentication/authenticationSlice';

function App() {
  const { status, token } = useSelector((state) => state.authentication);
  token && setAxiosHeader(token);
  const postStatus = useSelector((state) => state.posts.status);
  const searchUserStatus = useSelector((state) => state.search.status);

  const dispatch = useDispatch();

  useEffect(() => {
    setAxiosErrorHandler(dispatch);
  }, [dispatch, token]);

  useEffect(() => {
    if (token && status === 'idle') {
      dispatch(initializeLoggedInUser());
    }
  }, [status, dispatch, token]);

  useEffect(() => {
    if (token && postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch, token]);

  useEffect(() => {
    if (token && searchUserStatus === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [searchUserStatus, dispatch, token]);

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/posts/:postID" element={<SinglePostPage />} />
        <PrivateRoute path="/:username" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
