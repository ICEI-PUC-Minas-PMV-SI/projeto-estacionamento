import React from "react";
import "../styles/Perfil2.css";
import Logo from "../images/SmartPark-image-2.png";

function Perfil() {
  return (
      <div className="container-perfil">
        <div className="sidebar">
          <img className="imagemLogo" src={Logo} alt="Logo" />
          <div className="sidebar-links">
            <a href="#">Perfil</a>
            <a href="#">Vagas</a>
            <a href="#">Reservas</a>
          </div>
          <div className="logout">
            <a href="#">Sair</a>
          </div>
        </div>
        <div className="segundoContainerPerfil">
          <h1 className="primeiroTituloPerfil">Perfil</h1>

          <div className="flutuantesPerfil">
                <h3 className="meusdados">Meus dados</h3>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  id="nome"
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
                <input type="email" name="email" placeholder="Email" id="email" />

                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  id="senha"
                />

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
            
              <div className="button-perfil">
                <button className="editar-perfil">Editar</button>
                <button className="cancelar">Cancelar</button>
              </div>
          </div>
        </div>
      </div>
    
  );
}

export default Perfil;
