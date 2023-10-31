import React, {useState, useEffect} from "react";
import "../styles/Perfil.css";
import Logo from "../images/SmartPark-image-2.png";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { getFirestore, doc, updateDoc, onSnapshot  } from "firebase/firestore"; 

function Perfil() {

  const navigator = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [nome, setNome] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [telefone, setTelefone] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [nomeOriginal, setNomeOriginal] = useState('');
  const [enderecoOriginal, setEnderecoOriginal] = useState('');
  const [telefoneOriginal, setTelefoneOriginal] = useState('');
  const [modeloOriginal, setModeloOriginal] = useState('');
  const [placaOriginal, setPlacaOriginal] = useState('');
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            buscarDadosCliente(user);
        }
    });

    return () => unsubscribe();
}, [auth]);

const buscarDadosCliente = (user) => {
    if (user) {
        const db = getFirestore();
        const clienteRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(clienteRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setNome(data.nome || '');
                setEndereco(data.endereco || '');
                setTelefone(data.telefone || '');
                setModelo(data.modelo || '');
                setPlaca(data.placa || '');
                
                setNomeOriginal(data.nome || '');
                setEnderecoOriginal(data.endereco || '');
                setTelefoneOriginal(data.telefone || '');
                setModeloOriginal(data.modelo || '');
                setPlacaOriginal(data.placa || '');
            
            }
        });

        return () => unsubscribe();
    }
};

const handleEditarCliente = async () => {
  if (user) {
      const db = getFirestore();
      const clienteRef = doc(db, 'users', user.uid);
      const novosDadosCliente = {
          nome: nome,
          endereco: endereco,
          telefone: telefone,
          modelo: modelo,
          placa: placa,
      };

      try {
          await updateDoc(clienteRef, novosDadosCliente);
          console.log('Informações do cliente atualizadas com sucesso.');
      } catch (error) {
          console.error('Erro ao atualizar informações do cliente:', error);
      }
  }
};

const handleCancelar = () => {
  setNome(nomeOriginal);
  setEndereco(enderecoOriginal);
  setTelefone(telefoneOriginal);
  setModelo(modeloOriginal);
  setPlaca(placaOriginal);
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
      <div className="container-perfil">
        <div className="sidebar">
          <img className="imagemLogo" src={Logo} alt="Logo" />
          <div className="sidebar-links">
            <a href="/perfil">Perfil</a>
            <a href="/estacionamentos">Estacionamentos</a>
            <a href="/reservas-cliente">Reservas</a>
          </div>
          <div className="logout">
            <a onClick={signOutUser} href="#">Sair</a>
          </div>
        </div>
        <div className="segundoContainerPerfil">
          <h1 className="primeiroTituloPerfil">Perfil</h1>

          <div className="flutuantesPerfil">
                <h3 className="meusdados">Meus dados</h3>
                <input className="user-nome"
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <input className="user-telefone"
                  type="text"
                  name="telefone"
                  placeholder="Telefone"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />

                <input className="user-endereco"
                  type="text"
                  name="endereco"
                  placeholder="Endereço"
                  id="endereco"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
                {/* <input className="user-email" type="email" name="email" placeholder="Email" id="email" />

                <input className="user-senha"
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  id="senha"
                /> */}

                <input className="user-modelo"
                  type="text"
                  name="modelo"
                  placeholder="Modelo do Veículo"
                  id="modelo"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
                <input className="user-placa"
                  type="text"
                  name="placa"
                  placeholder="Placa do Veículo"
                  id="placa"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                />
            
              <div className="button-perfil">
                <button onClick={handleEditarCliente} className="editar-perfil">Editar</button>
                <button onClick={handleCancelar} className="cancelar">Cancelar</button>
              </div>
          </div>
        </div>
      </div>
    
  );
}

export default Perfil;
