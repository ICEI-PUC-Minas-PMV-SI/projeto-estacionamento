import '../styles/Login.css';
import React from 'react';
import Logo from "../images/SmartPark-image-2.png"
import Carros from "../images/CarrosEstacionados.avif"


function Login() {
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
            
            ></input>
          
          <input
            type="password"
            name="senha"
            placeholder="Sua senha"
            id="senha"
            
          ></input>

          <input
            type="button"
            value="Entrar"
            className="botao"
            id="botao"
            
            
          ></input>

<a href="">Esqueci a senha</a>
        </form>
    
    </div>
  );
}

export default Login;