import React, { useState } from 'react';
import Carros from '../images/FilaDeCarros.avif';
import '../styles/Cadastro.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';

function Cadastro() {
  const [opcao, setOpcao] = useState('cliente');

  const handleOpcaoChange = (event) => {
    setOpcao(event.target.value);
  };

    // Cadastro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  function handleSignOut(e){
    e.preventDefault();
    createUserWithEmailAndPassword(email, password)
  }

  if(loading){
    return <p>carregando...</p>;
  }


  return (
    <div className="container">
      <div className="tituloCadastro">Cadastre-se</div>
      <div className="options">
        <div className="radio-container">
          <input
            type="radio"
            id="opcao1"
            name="opcao"
            value="cliente"
            checked={opcao === 'cliente'}
            onChange={handleOpcaoChange}
          />
          <label htmlFor="opcao1" id="opcao1">
            Sou Cliente
          </label>
        </div>
        <div className="radio-container">
          <input
            type="radio"
            id="opcao2"
            name="opcao"
            value="proprietario"
            checked={opcao === 'proprietario'}
            onChange={handleOpcaoChange}
          />
          <label htmlFor="opcao2">Sou Proprietário</label>
        </div>
      </div>
      <img className="imagemCarros1" src={Carros} alt="Carros" />
      <form className="cadastro">
        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          id="nome"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          id="senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          id="telefone"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          id="endereco"
        />
        {opcao === 'cliente' && (
          <>
            <input
              type="text"
              name="modelo"
              placeholder="Modelo do Veículo"
              id="modelo"
            />
            <input
              type="text"
              name="placa"
              placeholder="Placa do Veículo"
              id="placa"
            />
          </>
        )}
        <button onClick={handleSignOut} className="button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
