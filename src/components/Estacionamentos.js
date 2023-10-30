import React from "react";
import "../styles/Estacionamentos.css";
import Logo from "../images/SmartPark-image-2.png";
import PerfilEstacionamento from "../images/PerfilEstacionamento.jpeg";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Estacionamentos() {
  const auth = getAuth();
  const navigator = useNavigate();

  const signOutUser = () => {
    signOut(auth)
        .then(() => {
            navigator('/');
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
};

  return (
    <div className="containerEstacionamentos">
      <div className="container-estacionamentos">
        <div className="sidebar">
          <img className="imagemLogo" src={Logo} alt="Logo" />
          <div className="sidebar-links">
            <a href="#">Perfil</a>
            <a href="#">Vagas</a>
            <a href="#">Reservas</a>
          </div>
          <div className="logout">
            <a href="#" onClick={signOutUser}>
              Sair
            </a>
          </div>
        </div>
        <div className="segundoContainerEstacionamentos">
          <h1 className="primeiroTituloEstacionamentos">Estacionamentos</h1>

          <div className="flutuantesEstacionamentos">
            <div className="flutuanteEstacionamento1">
              <img
                className="PerfilEstacionamento"
                src={PerfilEstacionamento}
                alt="Logo"
              />
              <h3 className="EstacionamentoNome">Estapar Centro</h3>
              <p className="EstacionamentoEndereco">
                Rua Rio de Janeiro, 789, Centro, Belo Horizonte-MG
              </p>
              <p className="EstacionamentoTelefone">(31)3000-0000</p>
              <p className="VagasComum">Vagas Comum:</p>
              <p className="VagasPCD">Vagas para PCD:</p>
              <p className="VagasCargo">Vagas Carga/Descarga:</p>

              <div className="TipoVaga">
                <h3 className="TituloTipoVaga">Tipo de Vaga</h3>
                <p className="VagasComum2">Comum</p>
                <p className="VagasPCD2">PCD</p>
                <p className="VagasCargo2">Carga/Descarga</p>
              </div>
              
                <button className="Reservar">Reservar</button>
              
            </div>

            <div className="flutuanteEstacionamento2">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estacionamentos;
