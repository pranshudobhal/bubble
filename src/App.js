import React from 'react';
import './App.css';
import { Navbar, Home, SinglePostPage, UserList, UserPage, Login, SignUp } from './features';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './features/authentication/PrivateRoute';
import { useSelector } from 'react-redux';

/**
 * TODO:
 * - change userID to User Name in userpage
 */

function App() {
  const { token } = useSelector((state) => state.authentication);

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/posts/:postID" element={<SinglePostPage />} />
        <PrivateRoute path="/profile" element={<UserList />} />
        <PrivateRoute path="/:username" element={<UserPage />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default App;
