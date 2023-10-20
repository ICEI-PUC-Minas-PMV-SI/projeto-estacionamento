import React from 'react';
import '../styles/Vagas.css';
import Logo from "../images/SmartPark-image-2.png"

function Vagas() {
    return (
        <div className='containerVagas'>
            <div className='container-vagas'>
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
                <div className='main-vagas'>
                    <div className='itens-vagas'>
                        <h1 className='titulo-vagas'>Vagas: </h1>
                        <h2 className='criar-vagas'>Cadastre a vaga em seu estacionamento: </h2>
                        <div className='formulario-criar-vaga'>
                            <label className='tipo-vaga'>Tipo de Vaga:</label>
                            <select id='tipo-vaga' name='tipo-vaga' className='select-vaga'>
                                <option value='Comum'>Comum</option>
                                <option value='PcD'>PcD</option>
                                <option value='Carga/Descarga'>Carga/Descarga</option>
                            </select>
                            <button className='botao-criar-vaga'>Criar</button>
                        </div> 
                        <div className='lista-vagas'>
                            <div className='vaga'>
                                    <span className='status-label'>Status:</span>
                                <div className='status-vaga'>
                                    <span className='status'>Disponível</span>
                                </div>
                                    <span className='tipo-label'>Tipo de Vaga:</span>
                                <div className='tipovaga'>
                                    <span className='tipo'>Comum</span>
                                </div>
                                <div className='excluir-vaga'>
                                    <span className='excluir'>&times;</span>
                                </div>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default Vagas;