import React, { useEffect } from 'react';
import './App.css';
import { Navbar, Home, SinglePostPage, UserPage, Login, SignUp } from './features';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './features/authentication/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { setAxiosHeader } from './utils/setAxiosHeader';
import { setAxiosErrorHandler } from './utils/setAxiosErrorHandler';
import { fetchPosts } from './features/posts/postsSlice';

function App() {
  const { token } = useSelector((state) => state.authentication);
  token && setAxiosHeader(token);
  const postStatus = useSelector((state) => state.posts.status);

  const dispatch = useDispatch();

  useEffect(() => {
    setAxiosErrorHandler(dispatch);
  }, [dispatch, token]);

  useEffect(() => {
    if (token && postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch, token]);

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
