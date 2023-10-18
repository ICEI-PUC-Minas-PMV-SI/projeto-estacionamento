import React from 'react';
import '../styles/Estacionamentos.css';
import Logo from "../images/SmartPark-image-2.png"


function Estacionamentos() {
    return (
        <div className='containerEstacionamentos'>
            <div className='container-estacionamentos'>
                <div className='sidebar'>
                    <img className="imagemLogo" src={Logo} alt="Logo" />
                    <div className='sidebar-links'>
                        <a href='#'>Perfil</a>
                        <a href='#'>Vagas</a>
                        <a href='#'>Reservas</a>
                    </div>
                    <div className='logout'>
                        <a href='#'>Sair</a>
                    </div>
               </div>
            </div>
        </div>    
    );
}

export default Estacionamentos;