import React, { useState } from 'react';
import Carros from '../images/FilaDeCarros.avif';
import '../styles/Cadastro.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../services/firebaseConfig';
import { getFirestore } from 'firebase/firestore';


function Cadastro() {
  const [opcao, setOpcao] = useState('cliente');

  const handleOpcaoChange = (event) => {
    setOpcao(event.target.value);
  };

    // Cadastro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [users, setUsers] = useState([]);
  


  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  function handleSignOut(e){
    e.preventDefault();
    createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    return db.collection('users').doc(user.uid).set({
      displayName: nome,
      telefone: telefone,
      endereco: endereco,
      placa: placa,
      nome: nome,
      modelo: modelo,
    });
  })
  .catch((error) => {
    console.error("Erro: ", error);
  });
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
          onChange={(e) => setNome(e.target.value)}
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
          onChange={(e) => setTelefone(e.target.value)}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          id="endereco"
          onChange={(e) => setEndereco(e.target.value)}
        />
        {opcao === 'cliente' && (
          <>
            <input
              type="text"
              name="modelo"
              placeholder="Modelo do Veículo"
              id="modelo"
              onChange={(e) => setModelo(e.target.value)}
            />
            <input
              type="text"
              name="placa"
              placeholder="Placa do Veículo"
              id="placa"
              onChange={(e) => setPlaca(e.target.value)}
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
