import '../styles/Login.css';
import React, { useState, useEffect } from 'react';
import Logo from "../images/SmartPark-image-2.png"
import Carros from "../images/CarrosEstacionados.avif"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom'; 


function Login() {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [
  //   signInWithEmailAndPassword,
  //   user,
  //   loading,
  //   error,
  // ] = useSignInWithEmailAndPassword(auth);

  // function handleSignOut(e){
  //   e.preventDefault();
  //   signInWithEmailAndPassword(email, password)
  // }

  // if(loading){
  //   return <p>carregando...</p>;
  // }

  // if(user){
  //   return console.log(user);
  // }

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [userData, setUserData] = useState(null);
  const navigator = useNavigate();


  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log(userCredential)
      console.log(userData)
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            setUserData(userDocSnapshot.data());
            if (userDocSnapshot.data().modelo && userDocSnapshot.data().placa) {
              navigator('/estacionamentos');
            } else {
              navigator('/estacionamento');
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);


  function redirecionarParaCadastro() {
    navigator('/cadastro'); // Redirecionamento para a página de cadastro
  }

  return (
    <div className="container">
            
        <img className="imagemCarros" src={Carros} alt="Logo" />
        <form className="login">
        <img className="imagemLogo" src={Logo} alt="Logo" />
        <div className="titulo" >Faça seu Login:</div>
        

          <input
            type="text"
            name="nome"
            placeholder="Usuário(Email)"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            ></input>
          
          <input
            type="password"
            name="senha"
            placeholder="Sua senha"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            
          ></input>

        <button onClick={login} className="button">
          Entrar
        </button>

<a href="/redefinirsenha">Esqueci a senha</a>

<p>Não possui conta?</p>


  <button onClick={redirecionarParaCadastro}>Cadastrar</button>

        </form>
    
    </div>
  );
}

export default Login;