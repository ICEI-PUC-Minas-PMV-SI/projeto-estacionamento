import React, { useState } from 'react';
import '../styles/RedefinirSenha.css';
import Carros from "../images/FilaDeCarros2.jpg";
import Logo from "../images/SmartPark-image-2.png";
import { auth } from '../services/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

function RedefinirSenha() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Email de recuperação enviado com sucesso!');
      })
      .catch(error => {
        alert('Usuário ainda não cadastrado no sistema');
      });
  };

  return (
    <div className="container">
      <img className="imagemCarros2" src={Carros} alt="Logo" />
      <form className="redefinir">
        <img className="imagemLogo" src={Logo} alt="Logo" />
        <div className="tituloRedefinir">Redefinir Senha</div>
        <div className="tituloRedefinir2">Digite seu email</div>
        <input
          type="text"
          name="nome"
          placeholder="Usuário(Email)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="button"
          value="Enviar"
          className="botao"
          onClick={handleResetPassword}
        />
      </form>
    </div>
  );
}

export default RedefinirSenha;
