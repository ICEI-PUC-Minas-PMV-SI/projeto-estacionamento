import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Logo from "../images/SmartPark-image-2.png";
import '../styles/Reservas.css'

function ReservasProprietario() {

    const navigator = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState(auth.currentUser);
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const uid = user.uid;

                const db = getFirestore();
                const vagasRef = collection(db, 'estacionamento', uid, 'vagas');
                const ocupadasQuery = query(
                    vagasRef,
                    where('status', '==', 'Ocupada')
                );

                const unsubscribeVagas = onSnapshot(ocupadasQuery, (querySnapshot) => {
                    const vagasData = [];
                    querySnapshot.forEach((vagaDoc) => {
                        const vaga = vagaDoc.data();
                        if (
                            vaga.usuarioReservaUid !== null &&
                            vaga.usuarioReservaNome !== null &&
                            vaga.usuarioReservaTelefone !== null &&
                            vaga.usuarioReservaPlaca !== null
                        ) {
                            vaga.id = vagaDoc.id;
                            vagasData.push(vaga);
                        }
                    });
                    setVagas(vagasData);
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

    const excluirReserva = async (vagaId) => {
        try {
          const db = getFirestore();
          const vagaRef = doc(db, 'estacionamento', user.uid, 'vagas', vagaId);
      
          await updateDoc(vagaRef, {
            status: 'Disponível',
            usuarioReservaUid: null,
            usuarioReservaNome: null,
            usuarioReservaPlaca: null,
            usuarioReservaTelefone: null
          });
      
          alert('Reserva excluída com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir a reserva:', error);
          alert('Erro ao excluir a reserva. Tente novamente mais tarde.');
        }
      };

    
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

    return (
        <div className='containerReservas'>
            <div className='container-reservas'>
                <div className='sidebar'>
                    <img className="imagemLogo" src={Logo} alt="Logo" />
                    <div className='sidebar-links'>
                        <a href='/perfil-proprietario'>Perfil</a>
                        <a href='/estacionamento'>Estacionamento</a>
                        <a href='/vagas'>Vagas</a>
                        <a href='/reservas-proprietario'>Reservas</a>
                    </div>
                    <div className='logout'>
                        <a onClick={signOutUser} href='#'>Sair</a>
                    </div>
                </div>
                <div className='main-reservas'>
                    <h1 className='titulo-reserva'>Reservas</h1>
                        <h2 className='subtitulo-reserva'>Vagas reservadas em seu estacionamento: </h2>
                        <div className='lista-reservas'>
                        {vagas.length > 0 ? (
                            vagas.map((vaga) => (
                                <div className='reserva' key={vaga.id}>
                                    <div className='cliente-info'>
                                        <h3 className='nome-cliente'>{vaga.usuarioReservaNome}</h3>
                                        <p className='endereco-cliente'>Placa: <span className='endereco'>{vaga.usuarioReservaPlaca}</span></p>
                                        <p className='telefone-cliente'>Telefone: <span className='telefone'>{vaga.usuarioReservaTelefone}</span></p>
                                        <p className='vaga-reservada'>Vaga Reservada: <span className='tipo'>{vaga.tipo}</span></p>
                                    </div>
                                    <button onClick={() => excluirReserva(vaga.id)} className='excluir-reserva'>Excluir Reserva</button>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma vaga reservada encontrada.</p>
                        )}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ReservasProprietario;