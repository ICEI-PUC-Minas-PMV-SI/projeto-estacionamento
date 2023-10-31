import React, { useState, useEffect } from 'react';
import Logo from "../images/SmartPark-image-2.png";
import '../styles/Reservas.css';
import { getAuth,signOut, onAuthStateChanged  } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc, query, where, collectionGroup, onSnapshot  } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 


function ReservasCliente() {
    const [vagasReservadas, setVagasReservadas] = useState([]);
    const [estacionamentos, setEstacionamentos] = useState([]);

    const auth = getAuth();
    const navigator = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            buscarVagasReservadas(user);
        }
        });

        return () => unsubscribe();
    }, [auth]);

    
    const buscarVagasReservadas = (user) => {
        try {
        const db = getFirestore();
    
        const vagasQuery = query(collectionGroup(db, 'vagas'), where('usuarioReservaUid', '==', user.uid));
    
        const unsubscribe = onSnapshot(vagasQuery, (vagasSnapshot) => {
            const vagas = [];
    
            vagasSnapshot.forEach((vagaDoc) => {
            const vagaData = vagaDoc.data();
            vagas.push({ id: vagaDoc.id, tipo: vagaData.tipo, userId: vagaDoc.ref.parent.parent.id });
            });
    
            const estacionamentosPromises = vagas.map((vaga) => {
            const estacionamentoRef = doc(db, 'estacionamento', vaga.userId); 
            return getDoc(estacionamentoRef).then((estacionamentoDoc) => {
                if (estacionamentoDoc.exists()) {
                const estacionamentoData = estacionamentoDoc.data();
                return { userId: vaga.userId, ...estacionamentoData };
                }
            });
            });
    
            Promise.all(estacionamentosPromises).then((estacionamentos) => {
            console.log('Estacionamentos:', estacionamentos);
    
            setVagasReservadas(vagas);
            setEstacionamentos(estacionamentos);
            });
        });
    
        return unsubscribe;
        } catch (error) {
        console.error('Erro ao buscar as vagas reservadas:', error);
        }
    };
  
  
  
    const excluirReserva = async (userId, vagaId) => {
      try {
        const db = getFirestore();
        const vagaRef = doc(db, 'estacionamento', userId, 'vagas', vagaId);
        await updateDoc(vagaRef, {
          usuarioReservaUid: '',
          usuarioReservaNome: '',
          usuarioReservaPlaca: '',
          usuarioReservaTelefone: '',
          status: 'Disponível'
        });
        console.log('Reserva excluída com sucesso');
        buscarVagasReservadas(user);
      } catch (error) {
        console.error('Erro ao excluir a reserva:', error);
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
  
    let estacionamentosObj = {};
      estacionamentos.forEach(estacionamento => {
      estacionamentosObj[estacionamento.userId] = estacionamento;
  });

    return (
        <div className='containerReservas'>
            <div className='container-reservas'>
                <div className='sidebar'>
                    <img className="imagemLogo" src={Logo} alt="Logo" />
                    <div className='sidebar-links'>
                        <a href='/perfil'>Perfil</a>
                        <a href='/estacionamentos'>Estacionamentos</a>
                        <a href='/reservas-cliente'>Reservas</a>
                    </div>
                    <div className='logout'>
                        <a onClick={signOutUser} href='/'>Sair</a>
                    </div>
                </div>
                <div className='main-reservas'>
                    <h1 className='titulo-reserva'>Reservas</h1>
                        <h2 className='subtitulo-reserva'>Vagas reservadas: </h2>
                        <div className='lista-reservas'>
                        {vagasReservadas.map((vaga) => (
                        <div className='reserva' key={vaga.id}>
                            <div className='cliente-info'>
                            <h3 className='nome-cliente'>{estacionamentosObj[vaga.userId]?.nome}</h3>
                            <p className='endereco-cliente'>Endereço: <span className='endereco'>{estacionamentosObj[vaga.userId].endereco}</span></p>
                            <p className='telefone-cliente'>Telefone: <span className='telefone'>{estacionamentosObj[vaga.userId].telefone}</span></p>
                            <p className='vaga-reservada'>Vaga Reservada: <span className='tipo'>{vaga.tipo}</span></p>
                            </div>
                            <button className='excluir-reserva' onClick={() => excluirReserva(vaga.userId, vaga.id)}>Excluir Reserva</button>
                        </div>
                        ))}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ReservasCliente;