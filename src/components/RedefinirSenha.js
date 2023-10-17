import React from 'react';
import '../styles/RedefinirSenha.css';
import Carros from "../images/FilaDeCarros2.jpg"
import Logo from "../images/SmartPark-image-2.png"

function RedefinirSenha() {
    return (

      <div className="container">
            
      <img className="imagemCarros2" src={Carros} alt="Logo" />
      <form className="redefinir">
      <img className="imagemLogo" src={Logo} alt="Logo" />
      <div className="tituloRedefinir" >Redefinir Senha</div>

      <div className="tituloRedefinir2" >Digite seu email</div>
      

        <input
          type="text"
          name="nome"
          placeholder="Usuário(Email)"
          id="email"
          
          ></input>
        

        <input
          type="button"
          value="Enviar"
          className="botao"
          id="botao"
          
          
        ></input>



      </form>
  
  </div>
     
    );
  }

  export default RedefinirSenha;