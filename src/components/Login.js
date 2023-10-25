import '../styles/Login.css';
import React, { useState } from 'react';
import Logo from "../images/SmartPark-image-2.png"
import Carros from "../images/CarrosEstacionados.avif"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  function handleSignOut(e){
    e.preventDefault();
    signInWithEmailAndPassword(email, password)
  }

  if(loading){
    return <p>carregando...</p>;
  }

  if(user){
    return console.log(user);
  }

  return (
    <div className="container">
            
        <img className="imagemCarros" src={Carros} alt="Logo" />
        <form className="login">
        <img className="imagemLogo" src={Logo} alt="Logo" />
        <div className="titulo" >Faça seu Login:</div>
        

          <input
            type="text"
            name="nome"
            placeholder="Usuário(Email)"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            
            ></input>
          
          <input
            type="password"
            name="senha"
            placeholder="Sua senha"
            id="senha"
            onChange={(e) => setPassword(e.target.value)}
            
          ></input>

        <button onClick={handleSignOut} className="button">
          Entrar
        </button>

<a href="">Esqueci a senha</a>

<p>Não possui conta?</p>

<button id="meu-botao">Cadastrar</button>

        </form>
    
    </div>
  );
}

export default Login;