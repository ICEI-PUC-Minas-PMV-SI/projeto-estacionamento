import React, { createContext, useContext, useState, useEffect } from 'react';
import '../styles/Estacionamento.css';
import Logo from "../images/SmartPark-image-2.png";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';


export function CriarEstacionamento() {
    const navigator = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState(auth.currentUser);
    const [nomeEstacionamento, setNomeEstacionamento] = useState('');
    const [enderecoEstacionamento, setEnderecoEstacionamento] = useState('');
    const [telefoneEstacionamento, setTelefoneEstacionamento] = useState('');
    const [imagemEstacionamento, setImagemEstacionamento] = useState('');

    const signOutUser = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigator('/')
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                buscarDadosEstacionamento(user);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const buscarDadosEstacionamento = (user) => {
        if (user) {
            const db = getFirestore();
            const estacionamentoRef = doc(db, 'estacionamento', user.uid);
            const unsubscribe = onSnapshot(estacionamentoRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setNomeEstacionamento(data.nome || '');
                    setEnderecoEstacionamento(data.endereco || '');
                    setTelefoneEstacionamento(data.telefone || '');
                    setImagemEstacionamento(data.imagem || '');
                }
            });

            return () => unsubscribe();
        }
    };

    const handleCriarEstacionamento = async () => {
        if (user) {
            if (!user.modelo && !user.placa) {
                const db = getFirestore();
                const estacionamentoRef = doc(db, 'estacionamento', user.uid);
                const estacionamentoDoc = await getDoc(estacionamentoRef);

                if (estacionamentoDoc.exists()) {
                    console.log('Estacionamento já existe.');
                } else {
                    const estacionamentoData = {
                        nome: nomeEstacionamento,
                        endereco: enderecoEstacionamento,
                        telefone: telefoneEstacionamento,
                        imagem: imagemEstacionamento
                    };

                    await setDoc(estacionamentoRef, estacionamentoData);
                    console.log('Estacionamento criado com sucesso.');
                }
            } else {
                console.log('Usuário não é proprietário.');
            }
        }
    };

    const handleEditarEstacionamento = async () => {
        if (user) {
            const db = getFirestore();
            const estacionamentoRef = doc(db, 'estacionamento', user.uid);
            const novosDadosEstacionamento = {
                nome: nomeEstacionamento,
                endereco: enderecoEstacionamento,
                telefone: telefoneEstacionamento,
                imagem: imagemEstacionamento
            };

            try {
                await updateDoc(estacionamentoRef, novosDadosEstacionamento);
                console.log('Informações do estacionamento atualizadas com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar informações do estacionamento:', error);
            }
        }
    };

    return (
        <div className='containerCriarEstacionamento'>
            <div className='container-estacionamento'>
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
                <div className='main-perfil'>
                    <h1 className='titulo-perfil'>Estacionamento</h1>
                    <div className='form-perfil'>
                        <label className='subtitulo-perfil'>Cadastre seu estacionamento: </label>
                        <div className='info-perfil'>
                            <input 
                            className='nome-perfil' 
                            placeholder='Imagem do Estacionamento'
                            value={imagemEstacionamento}
                            onChange={(e) => setImagemEstacionamento(e.target.value)}
                            ></input>
                            <input
                                value={nomeEstacionamento}
                                onChange={(e) => setNomeEstacionamento(e.target.value)}
                                className='nome-perfil'
                                placeholder='Nome do Estacionamento'
                            />
                            <input
                                value={enderecoEstacionamento}
                                onChange={(e) => setEnderecoEstacionamento(e.target.value)}
                                className='endereco-perfil'
                                placeholder='Endereço do Estacionamento'
                            />
                            <input
                                value={telefoneEstacionamento}
                                onChange={(e) => setTelefoneEstacionamento(e.target.value)}
                                className='telefone-perfil'
                                placeholder='Telefone do Estacionamento'
                            />
                        </div>
                        <div className='button-perfil'>
                            <button onClick={handleCriarEstacionamento} className='confirmar-perfil'>Salvar</button>
                            <button onClick={handleEditarEstacionamento} className='editar-estacionamento'>Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CriarEstacionamento;