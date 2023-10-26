import React, { useState, useEffect } from 'react';
import '../styles/Vagas.css';
import Logo from "../images/SmartPark-image-2.png";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';

function Vagas() {
    const navigator = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [estacionamentoCriado, setEstacionamentoCriado] = useState(false);

    const [vagas, setVagas] = useState([]);
    const [novaVaga, setNovaVaga] = useState({
        tipoDeVaga: '', 
    });

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                navigator('/');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    useEffect(() => {
        if (user) {
          const db = getFirestore();
          const vagasRef = collection(db, 'estacionamento', user.uid, 'vagas');
    
          getVagasFromFirestore(vagasRef);
    
          const estacionamentoRef = doc(db, 'estacionamento', user.uid);
          onSnapshot(estacionamentoRef, (docSnapshot) => {
            setEstacionamentoCriado(docSnapshot.exists());
          });
        }
      }, [user]);
    
      const getVagasFromFirestore = async (vagasRef) => {
        try {
          const vagasSnapshot = await getDocs(vagasRef);
          const vagasData = [];
          vagasSnapshot.forEach((vagaDoc) => {
            const vagaData = vagaDoc.data();
            vagasData.push(vagaData);
          });
          setVagas(vagasData);
        } catch (error) {
          console.error('Erro ao buscar vagas:', error);
        }
      };
    
      const criarVaga = async () => {
        if (!estacionamentoCriado) {
          alert('Você precisa criar um estacionamento primeiro.');
          return;
        }
    
        if (!novaVaga.tipoDeVaga) {
          alert('Por favor, selecione o tipo de vaga.');
          return;
        }
    
        const novaVagaData = {
          tipo: novaVaga.tipoDeVaga,
          status: 'Disponível',
        };
    
        if (user) {
          const db = getFirestore();
          const vagasRef = collection(db, 'estacionamento', user.uid, 'vagas');
    
          try {
            await setDoc(doc(vagasRef), novaVagaData);
            setVagas((prevVagas) => [...prevVagas, novaVagaData]);
          } catch (error) {
            console.error('Erro ao criar vaga:', error);
          }
        }
        setNovaVaga({
          tipoDeVaga: '',
        });
      };

    return (
        <div className='containerVagas'>
            <div className='container-vagas'>
                <div className='sidebar'>
                    <img className="imagemLogo" src={Logo} alt="Logo" />
                    <div className='sidebar-links'>
                        <a href='/perfil-proprietario'>Perfil</a>
                        <a href='/estacionamento'>Estacionamento</a>
                        <a href='/vagas'>Vagas</a>
                        <a href='/reservas-proprietario'>Reservas</a>
                    </div>
                    <div className='logout'>
                        <a href='#' onClick={signOutUser}>Sair</a>
                    </div>
                </div>
                <div className='main-vagas'>
                    <div className='itens-vagas'>
                        <h1 className='titulo-vagas'>Vagas: </h1>
                        <h2 className='criar-vagas'>Cadastre a vaga em seu estacionamento: </h2>
                        <div className='formulario-criar-vaga'>
                            <label className='tipo-vaga'>Tipo de Vaga:</label>
                            <select 
                            onChange={(event) => setNovaVaga({ tipoDeVaga: event.target.value })}
                            id='tipo-vaga' name='tipo-vaga' className='select-vaga'>
                                <option value='Comum'>Comum</option>
                                <option value='PcD'>PcD</option>
                                <option value='Carga/Descarga'>Carga/Descarga</option>
                            </select>
                            <button onClick={criarVaga} className='botao-criar-vaga'>Criar</button>
                        </div> 
                        <div className='lista-vagas'>
                            {vagas.map((vaga, index) => (
                                <div className="vaga" key={index}>
                                <span className="status-label">Status:</span>
                                <div className="status-vaga">
                                    <span className="status">{vaga.status}</span>
                                </div>
                                <span className="tipo-label">Tipo de Vaga:</span>
                                <div className="tipovaga">
                                    <span className="tipo">{vaga.tipo}</span>
                                </div>
                                <div className="excluir-vaga">
                                    <span className="excluir">&times;</span>
                                </div>
                                </div>
                            ))}
                        </div>       
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default Vagas;