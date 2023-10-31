import React, {useState, useEffect} from "react";
import "../styles/Perfil.css";
import Logo from "../images/SmartPark-image-2.png";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { getFirestore, doc, updateDoc, onSnapshot  } from "firebase/firestore"; 

function PerfilProprietario() {

  const navigator = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [nome, setNome] = useState(''); 
  const [endereco, setEndereco] = useState(''); 
  const [telefone, setTelefone] = useState('');
  const [nomeOriginal, setNomeOriginal] = useState('');
  const [enderecoOriginal, setEnderecoOriginal] = useState('');
  const [telefoneOriginal, setTelefoneOriginal] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            buscarDadosProprietario(user);
        }
    });

    return () => unsubscribe();
}, [auth]);

const buscarDadosProprietario = (user) => {
    if (user) {
        const db = getFirestore();
        const proprietarioRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(proprietarioRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setNome(data.nome || '');
                setEndereco(data.endereco || '');
                setTelefone(data.telefone || '');

                setNomeOriginal(data.nome || '');
                setEnderecoOriginal(data.endereco || '');
                setTelefoneOriginal(data.telefone || '');
            }
        });

        return () => unsubscribe();
    }
};

const handleEditarProprietario = async () => {
  if (user) {
      const db = getFirestore();
      const proprietarioRef = doc(db, 'users', user.uid);
      const novosDadosProprietario = {
          nome: nome,
          endereco: endereco,
          telefone: telefone
      };

      try {
          await updateDoc(proprietarioRef, novosDadosProprietario);
          console.log('Informações do proprietario atualizadas com sucesso.');
      } catch (error) {
          console.error('Erro ao atualizar informações do proprietario:', error);
      }
  }
};

const handleCancelar = () => {
  setNome(nomeOriginal);
  setEndereco(enderecoOriginal);
  setTelefone(telefoneOriginal);
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
            <a href="/perfil-proprietario">Perfil</a>
            <a href="/estacionamento">Estacionamento</a>
            <a href="/vagas">Vagas</a>
            <a href="/reservas-proprietario">Reservas</a>
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
            
              <div className="button-perfil">
                <button onClick={handleEditarProprietario} className="editar-perfil">Editar</button>
                <button onClick={handleCancelar} className="cancelar">Cancelar</button>
              </div>
          </div>
        </div>
      </div>
    
  );
}

export default PerfilProprietario;