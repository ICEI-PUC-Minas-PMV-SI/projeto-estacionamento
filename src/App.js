import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes, Route as ReactRoute } from 'react-router'; 

import Login from './components/Login';
import HomePage from './components/HomePage';
import Cadastro from './components/Cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <ReactRoute path="/"     element={<Login />} />
        <ReactRoute path="/home" element={<HomePage />} />
        <ReactRoute path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;




