import React, { useEffect } from 'react';
import './App.css';
import { Navbar, Home, SinglePostPage, UserPage, Login, SignUp } from './features';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './features/authentication/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { setAxiosHeader } from './utils/setAxiosHeader';
import { setAxiosErrorHandler } from './utils/setAxiosErrorHandler';

function App() {
  const { token } = useSelector((state) => state.authentication);
  token && setAxiosHeader(token);

  const dispatch = useDispatch();

  useEffect(() => {
    setAxiosErrorHandler(dispatch);
  }, [dispatch, token]);

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/posts/:postID" element={<SinglePostPage />} />
        {/* <PrivateRoute path="/profile" element={<UserList />} /> */}
        <PrivateRoute path="/:username" element={<UserPage />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default App;
