import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes, Route as ReactRoute } from 'react-router'; 

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Vagas from './components/Vagas';
import RedefinirSenha from './components/RedefinirSenha';
import Estacionamentos from './components/Estacionamentos';
import ReservasProprietario from './components/ReservasProprietario';


function App() {
  return (
    <Router>
      <Routes>
        <ReactRoute path="/" element={<Login />} />
        <ReactRoute path="/redefinirsenha" element={<RedefinirSenha />} />
        <ReactRoute path="/cadastro" element={<Cadastro />} />
        <ReactRoute path="/vagas" element={<Vagas />} />
        <ReactRoute path="/estacionamentos" element={<Estacionamentos/>} />
        <ReactRoute path="/reservas-proprietario" element={<ReservasProprietario />} />
      </Routes>
    </Router>
  );
}

export default App;




