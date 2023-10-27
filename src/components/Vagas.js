import React, { useState, useEffect } from 'react';
import '../styles/Vagas.css';
import Logo from "../images/SmartPark-image-2.png";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, onSnapshot, query } from 'firebase/firestore';

function Vagas() {
    const navigator = useNavigate();
    const auth = getAuth();
    const [estacionamentoCriado, setEstacionamentoCriado] = useState(false);
    const [user, setUser] = useState(auth.currentUser);
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const uid = user.uid;

                const db = getFirestore();
                const vagasRef = collection(db, 'estacionamento', uid, 'vagas');

                const unsubscribeVagas = onSnapshot(query(vagasRef), (querySnapshot) => {
                    const vagasData = [];
                    querySnapshot.forEach((vagaDoc) => {
                        vagasData.push(vagaDoc.data());
                    });
                    setVagas(vagasData);
                });

                const estacionamentoRef = doc(db, 'estacionamento', uid);
                getDoc(estacionamentoRef)
                    .then((docSnapshot) => {
                        setEstacionamentoCriado(docSnapshot.exists());
                    })
                    .catch((error) => {
                        console.error('Erro ao acessar:', error);
                    });
                return () => {
                    unsubscribeVagas();
                };
            } else {
                console.log("Usuário não autenticado")
            }
        });

        return () => unsubscribe();
    }, [auth]);

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

                const vagasSnapshot = await getDocs(vagasRef);
                const vagasData = [];
                vagasSnapshot.forEach((vagaDoc) => {
                    const vagaData = vagaDoc.data();
                    vagasData.push(vagaData);
                });
                setVagas(vagasData);
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