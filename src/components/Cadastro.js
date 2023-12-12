import React, { useState } from 'react';
import Carros from '../images/FilaDeCarros.avif';
import '../styles/Cadastro.css';
import { auth } from '../services/firebaseConfig';
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Modal from './Modal';


function Cadastro() {
  const [opcao, setOpcao] = useState('cliente');
  const [termosAceitos, setTermosAceitos] = useState(false);

  const handleOpcaoChange = (event) => {
    setOpcao(event.target.value);
  };

  const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
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

    if (!termosAceitos) {
    alert('Por favor, aceite os Termos e Condições para se registrar.');
    return; 
    }
  
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
        <label htmlFor="termos" className="termos">
        <input
            type="checkbox"
            id="termos"
            name="termos"
            required
            className="termos-input"
            onChange={e => setTermosAceitos(e.target.checked)}
          />
          <span className="texto-termos" >
            Eu aceito os 
            <a  className="termos-link" href="#" onClick={openModal}> Termos e Condições</a>
            </span>
          </label>
        <button onClick={cadastro} className="button">
          Cadastrar
        </button>
      </form>
      <Modal isOpen={modalOpen} close={closeModal}>
        <h2>Termos e Condições</h2>
        <ul>
        Ao prosseguir com o cadastro, você concorda com o tratamento de seus dados pessoais conforme descrito nesta política de privacidade, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018.</ul>
        <ul><strong>Coleta de Dados:</strong> Nós coletamos informações necessárias exclusivamente para o cadastro e utilização dos serviços oferecidos. Isso inclui, mas não se limita a, nome, endereço de e-mail e informações de contato.</ul>
        <ul><strong>Uso de Dados: </strong> Seus dados serão utilizados para possibilitar o acesso aos nossos serviços, comunicação e melhorias contínuas da plataforma.</ul>
        <ul><strong>Compartilhamento de Dados: </strong> Não compartilhamos suas informações com terceiros, exceto quando necessário para a prestação dos serviços contratados ou por exigência legal.</ul>
        <ul><strong>Direitos do Usuário: </strong> Você tem o direito de acessar, corrigir, excluir ou limitar o tratamento de seus dados pessoais. Para exercer esses direitos, entre em contato conosco através dos canais de atendimento disponíveis.</ul>
        <ul><strong>Consentimento: </strong> Ao marcar esta opção, você declara que leu e concorda com os termos aqui apresentados.</ul>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
}

export default Cadastro;
