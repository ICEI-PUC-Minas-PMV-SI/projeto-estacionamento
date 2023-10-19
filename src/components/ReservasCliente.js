import React from 'react';
import Logo from "../images/SmartPark-image-2.png";
import '../styles/Reservas.css';

function ReservasCliente() {
    return (
        <div className='containerReservas'>
            <div className='container-reservas'>
                <div className='sidebar'>
                    <img className="imagemLogo" src={Logo} alt="Logo" />
                    <div className='sidebar-links'>
                        <a href='#'>Perfil</a>
                        <a href='#'>Estacionamentos</a>
                        <a href='#'>Reservas</a>
                    </div>
                    <div className='logout'>
                        <a href='#'>Sair</a>
                    </div>
                </div>
                <div className='main-reservas'>
                    <h1 className='titulo-reserva'>Reservas</h1>
                        <h2 className='subtitulo-reserva'>Vagas reservadas: </h2>
                        <div className='lista-reservas'>
                            <div className='reserva'>
                            <div className='cliente-info'>
                                <h3 className='nome-cliente'>Nome do Estacionamento</h3>
                                <p className='endereco-cliente'>Endereço: <span className='endereco'>Endereco estacionamento</span></p>
                                <p className='telefone-cliente'>Telefone: <span className='telefone'>Telefone estacionamento</span></p>
                                <p className='vaga-reservada'>Vaga Reservada: <span className='tipo'>Comum</span></p>
                            </div>
                            <button className='excluir-reserva'>Excluir Reserva</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ReservasCliente;