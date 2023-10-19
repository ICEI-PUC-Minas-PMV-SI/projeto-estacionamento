import React from 'react';
import Logo from "../images/SmartPark-image-2.png";
import '../styles/Perfil.css';

function CriarEstacionamento() {
    return (
        <div className='containerCriarEstacionamento'>
            <div className='container-estacionamento'>
                <div className='sidebar'>
                    <img className="imagemLogo" src={Logo} alt="Logo" />
                    <div className='sidebar-links'>
                        <a href='#'>Perfil</a>
                        <a href='#'>Estacionamento</a>
                        <a href='#'>Vagas</a>
                        <a href='#'>Reservas</a>
                    </div>
                    <div className='logout'>
                        <a href='#'>Sair</a>
                    </div>
                </div>
                <div className='main-perfil'>
                    <h1 className='titulo-perfil'>Estacionamento</h1>
                    <div className='form-perfil'>
                        <label className='subtitulo-perfil'>Cadastre seu estacionamento: </label>
                        <div className='info-perfil'>
                        <input className='nome-perfil' placeholder='Nome do Estacionamento'></input>
                        <input className='endereco-perfil' placeholder='Endereço do Estacionamento'></input>
                        <input className='telefone-perfil' placeholder='Telefone do Estacionamento'></input>
                        </div>
                    <div className='button-perfil'>
                        <button className='confirmar-perfil'>Salvar</button>
                        <button className='editar-perfil'>Editar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CriarEstacionamento;