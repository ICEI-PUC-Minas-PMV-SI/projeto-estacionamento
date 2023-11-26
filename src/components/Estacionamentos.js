import React, { useState, useEffect } from "react";
import "../styles/Estacionamentos.css";
import Logo from "../images/SmartPark-image-2.png";
import PerfilEstacionamento from "../images/PerfilEstacionamento.jpeg";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, updateDoc, getDoc, query, where, collectionGroup  } from 'firebase/firestore';


function Estacionamentos() {
  const auth = getAuth();
  const navigator = useNavigate();
  const [estacionamentos, setEstacionamentos] = useState([]);
  const [tipoVagaEscolhido, setTipoVagaEscolhido] = useState({});
  const [reservaFeita, setReservaFeita] = useState(false);
  const user = auth.currentUser;
  const [comum, setComum] = useState(false);
  const [pcd, setPcd] = useState(false);
  const [cargaDescarga, setCargaDescarga] = useState(false);
  const allUnchecked = !comum && !pcd && !cargaDescarga;
  const [searchValue, setSearchValue] = useState('');
  
  const estacionamentoRefs = estacionamentos.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});
  
  const filteredEstacionamentos = estacionamentos.filter(estacionamento =>
    (estacionamento.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
    estacionamento.endereco.toLowerCase().includes(searchValue.toLowerCase())) &&
    (allUnchecked ||
    (comum && estacionamento.vagasDisponiveisPorTipo['Comum'] > 0) ||
    (pcd && estacionamento.vagasDisponiveisPorTipo['PcD'] > 0) ||
    (cargaDescarga && estacionamento.vagasDisponiveisPorTipo['Carga/Descarga'] > 0))
  );

  const handleTipoVagaChange = (estacionamentoId, tipo) => {
    setTipoVagaEscolhido(prevState => ({
      ...prevState,
      [estacionamentoId]: tipo,
    }));
  };

  useEffect(() => {
    const fetchEstacionamentos = async () => {
        try {
            const db = getFirestore();
            const estacionamentosRef = collection(db, 'estacionamento');
            const estacionamentosSnapshot = await getDocs(estacionamentosRef);
            const promises = estacionamentosSnapshot.docs.map(async (doc) => {
                const estacionamento = doc.data();
                estacionamento.id = doc.id; 
                const vagasRef = collection(estacionamentosRef, doc.id, 'vagas');
                const vagasSnapshot = await getDocs(vagasRef);
                const tiposVaga = ['Comum', 'PcD', 'Carga/Descarga'];
                const vagasPorTipo = {};
                tiposVaga.forEach(tipo => {
                  const vagasTipo = vagasSnapshot.docs.filter((vaga) => vaga.data().tipo === tipo && vaga.data().status === 'Disponível').length;
                  vagasPorTipo[tipo] = vagasTipo;
                });

                estacionamento.vagasDisponiveisPorTipo = vagasPorTipo;
                return estacionamento;
            });

            const estacionamentos = await Promise.all(promises);

            setEstacionamentos(estacionamentos);
        } catch (error) {
            console.error('Erro ao buscar estacionamentos:', error);
        }
    };

    fetchEstacionamentos();
  }, [reservaFeita]);

  const buscarInformacoesUsuario = async (user) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
  
    try {
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return userData; 
      } else {
        console.log('Informações do usuário não encontradas.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      return null;
    }
  };

  
const fazerReserva = async (userId, tipoVagaEscolhido, user) => {
  if (!user) {
    alert('Você não está autenticado. Faça login para fazer uma reserva.');
    return;
  }
  
  try {
    const db = getFirestore();
    const userData = await buscarInformacoesUsuario(user);

    if (!userData) {
      alert('Informações do usuário não encontradas.');
      return;
    }

    const estacionamentoRef = doc(db, 'estacionamento', userId);
    const vagasRef = collection(estacionamentoRef, 'vagas');
    const vagasQuery = query(vagasRef, where('tipo', '==', tipoVagaEscolhido), where('status', '==', 'Disponível'));
    const vagasSnapshot = await getDocs(vagasQuery);

    if (vagasSnapshot.empty) {
      const estacionamentosComVagaDisponivel = estacionamentos
        .filter(estacionamento => estacionamento.vagasDisponiveisPorTipo[tipoVagaEscolhido] > 0)
        .map(estacionamento => estacionamento.nome);

      if (estacionamentosComVagaDisponivel.length > 0) {
        alert(`Não há vagas disponíveis desse tipo no estacionamento selecionado. Estacionamentos com vaga disponível: ${estacionamentosComVagaDisponivel.join(', ')}.`);
      } else {
        alert('Não há vagas disponíveis desse tipo em nenhum estacionamento.');
      }
      return;
    }

    const vagaSelecionada = vagasSnapshot.docs[0];
    const vagaData = {
      ...vagaSelecionada.data(),
      status: 'Ocupada',
      usuarioReservaUid: user.uid,
      usuarioReservaNome: userData.nome, 
      usuarioReservaPlaca: userData.placa, 
      usuarioReservaTelefone: userData.telefone
    };

    const vagaRef = doc(vagasRef, vagaSelecionada.id);
    await updateDoc(vagaRef, vagaData);

    const estacionamentosAtualizados = estacionamentos.map(estacionamento => {
      if (estacionamento.id === userId) {
        return {
          ...estacionamento,
          ...estacionamento.vagasDisponiveisPorTipo,
          [tipoVagaEscolhido]: estacionamento.vagasDisponiveisPorTipo[tipoVagaEscolhido] - 1,
        };
      }
      return estacionamento;
    });

    setEstacionamentos(estacionamentosAtualizados);

    setTipoVagaEscolhido(prevState => ({
      ...prevState,
      [userId]: 'Comum',
    }));
    
    setReservaFeita(prevState => !prevState);

    alert('Reserva realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao fazer a reserva:', error);
    alert('Erro ao fazer a reserva. Tente novamente mais tarde.');
  }
};

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
            <a href="/perfil">Perfil</a>
            <a href="/estacionamentos">Estacionamentos</a>
            <a href="/reservas-cliente">Reservas</a>
          </div>
          <div className="logout">
            <a href="#" onClick={signOutUser}>
              Sair
            </a>
          </div>
        </div>   
        <div className="segundoContainerEstacionamentos">
          <h1 className="primeiroTituloEstacionamentos">Estacionamentos</h1>
          <input className="pesquisa"
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Pesquisar estacionamentos... 🔍"
          />
          <div className="buscarTipo">
          <p className="selecionarTipo">Selecione os tipos de vagas que você está procurando:</p>
          <input type="checkbox" checked={comum} onChange={e => setComum(e.target.checked)} /> 
          <span className="buscaBox">Comum</span>
          <input type="checkbox" checked={pcd} onChange={e => setPcd(e.target.checked)} /> 
          <span className="buscaBox">Pcd</span>
          <input type="checkbox" checked={cargaDescarga} onChange={e => setCargaDescarga(e.target.checked)} />
          <span className="buscaBox">Carga/Descarga</span>
          </div>
           <div className="flutuantesEstacionamentos">
            {filteredEstacionamentos.map(estacionamento => (
              <div className="flutuanteEstacionamento1" key={estacionamento.id} ref={estacionamentoRefs[estacionamento.id]}>
                <img className="PerfilEstacionamento"  src={estacionamento.imagem}></img>
                <p className="EstacionamentoNome">{estacionamento.nome}</p>
                <p className="EstacionamentoEndereco">{estacionamento.endereco}</p>
                <p className="EstacionamentoTelefone">{estacionamento.telefone}</p>
                <p className="VagasComum">Vagas Comuns: {estacionamento.vagasDisponiveisPorTipo.Comum}</p>
                <p className="VagasPCD">Vagas PcD:{estacionamento.vagasDisponiveisPorTipo.PcD}</p>
                <p className="VagasCargo">Vagas Carga/Descarga:{estacionamento.vagasDisponiveisPorTipo['Carga/Descarga']}</p>
                <div className="TipoVaga">
                  <h3 className="TituloTipoVaga">Tipo de Vaga</h3>
                  <select className="selectTipoVaga" value={tipoVagaEscolhido[estacionamento.id] || 'Comum'} onChange={(e) => handleTipoVagaChange(estacionamento.id, e.target.value)}>
                    <option value="Comum">Comum</option>
                    <option value="PcD">PcD</option>
                    <option value="Carga/Descarga">Carga/Descarga</option>
                  </select>
                </div>
                <button className="Reservar" onClick={() => fazerReserva(estacionamento.id, tipoVagaEscolhido[estacionamento.id] || 'Comum', user)}>
                  Reservar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estacionamentos;
