import '../styles/Cadastro.css';
import React from 'react';
import Carros from "../images/FilaDeCarros.avif"


function Cadastro() {
    return (

        <div className="container">

        <div className="titulo" >Cadastre-se</div>

<div className="options">
    <div className="radio-container">
        <input type="radio" id="opcao1" name="opcao" value="opcao1"></input>
        <label for="opcao1" id="opcao1">Sou Cliente</label>
    </div>

    <div className="radio-container">
        <input type="radio" id="opcao2" name="opcao" value="opcao2"></input>
        <label for="opcao2">Sou Proprietário</label>
    </div>
</div>
        

          <img className="imagemCarros" src={Carros} alt="Carros" />
     <form className="cadastro">
         
          
        <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            id="nome"
            
          ></input>
          
          <input
            type="text"
            name="email"
            placeholder="Email"
            
            
          ></input>
          

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            id="senha"
            
            ></input>

            <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            id="telefone"
            
            ></input>

            <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            id="endereco"
            
            ></input>

            <input
            type="text"
            name="modelo"
            placeholder="Modelo do Veículo"
            id="modelo"
            
            ></input>

            <input
            type="text"
            name="placa"
            placeholder="Placa do Veículo"
            id="placa"
            
            ></input>

            <input
            type="button"
            value="Cadastrar"
            className="botao"
            id="botao"
            
            
            ></input>

    </form>

         </div>
     
    );
  }

  export default Cadastro;