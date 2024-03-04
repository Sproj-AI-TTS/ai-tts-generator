// import './App.css';
import React, { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './login';
import Signup from './signup';
import Home from './home';
// import Editprof from './components/editprof';
// import AdminScreen from './components/admin';




function App() {
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/admin" element={<AdminScreen />} /> */}
          {/* should add some kind of authentication to prevent users from 
          jumping from site to site without user authentication*/}
    
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;
