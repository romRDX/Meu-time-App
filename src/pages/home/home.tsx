import React, { useState } from 'react';
import styles from "./home.module.scss";
import { useFootballApi } from '../../hooks/useFootballAPI';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const client = useFootballApi();
  const { setUserKey } = useAuth();
  const navigate = useNavigate();

  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState<boolean>(false);

  const handleLogin = () => {
    
    if(keyInput){
      client("countries", keyInput).then((res) => {

        if(res.errors.length === 0){
          console.log("FOI");
          setUserKey(keyInput);
          navigate("/times", { state: { countries: res.response} });
        } else {
          setKeyError(true);
          setKeyInput("");
        }
      })
    }
  }

  const handleOnChange = (element: HTMLInputElement) => {
    if(keyError){
      setKeyError(false);
    }

    setKeyInput(element.value)
  }

  return (
    <div className={styles.home}>
      <h1>Bem vindo ao Meu Time, seu site de dados e informações sobre futebol!</h1>

      <div className={styles.home__login}>
        <h2>Faça login para acessar os nosso dados.</h2>
        
        <label htmlFor='user-key' >Chave de acesso: </label>
        <input value={keyInput} onChange={(e) => handleOnChange(e.target)} id='user-key' />
        <button onClick={handleLogin}>Fazer login</button>
        {
          keyError &&        
          <div className={styles.home__error}>
            <p>Erro nas credenciais, por favor, insira uma chave de acesso válida.</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
