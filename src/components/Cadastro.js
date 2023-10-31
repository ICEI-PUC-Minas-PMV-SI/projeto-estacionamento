import React, { useState } from 'react';
import Carros from '../images/FilaDeCarros.avif';
import '../styles/Cadastro.css';
import { auth } from '../services/firebaseConfig';
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Cadastro() {
  const [opcao, setOpcao] = useState('cliente');

  const handleOpcaoChange = (event) => {
    setOpcao(event.target.value);
  };

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");

  const cadastro = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
  
      const db = getFirestore(); 
  
      const userRef = doc(db, 'users', user.uid);
  
      const userData = {
        nome,
        telefone,
        endereco,
        opcao,
      };
  
      if (opcao === 'cliente') {
        userData.modelo = modelo;
        userData.placa = placa;
      }
  
      await setDoc(userRef, userData);

      setNome("");
      setEmail("");
      setSenha("");
      setTelefone("");
      setEndereco("");
      setModelo("");
      setPlaca("");
  
      console.log('User registered:', user);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };


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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          id="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          id="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
        {opcao === 'cliente' && (
          <>
            <input
              type="text"
              name="modelo"
              placeholder="Modelo do Veículo"
              id="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
            <input
              type="text"
              name="placa"
              placeholder="Placa do Veículo"
              id="placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
          </>
        )}
        <button onClick={cadastro} className="button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
