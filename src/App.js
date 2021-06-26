import React from 'react';
import './App.css';
import { Navbar, Home, SinglePostPage } from './features';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './features/authentication/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/posts/:postID" element={<SinglePostPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}

        {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </>
  );
}

export default App;
