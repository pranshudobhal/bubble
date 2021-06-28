import React from 'react';
import './App.css';
import { Navbar, Home, SinglePostPage, UserList, UserPage } from './features';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './features/authentication/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/posts/:postID" element={<SinglePostPage />} />

        <PrivateRoute path="/profile" element={<UserList />} />
        <PrivateRoute path="/profile/:userID" element={<UserPage />} />

        {/* <Route path="/profile" element={<Profile />} /> */}

        {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </>
  );
}

export default App;
