import React, { useState, useEffect } from 'react';
import styles from "./teams.module.scss";

import { useFootballApi } from '../../hooks/useFootballAPI';
import {useLocation} from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Country } from '../../types';

interface SelectedData {
  country: Country | null,
  season: any | null,
  league: any | null,
  team: any | null,
}

const Home = () => {

  const location = useLocation();
  const { userKey } = useAuth();
  

  const [countries, setCountries] = useState<Country[]>([]);
  const [seasons, setSeasons] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState<Country>();
  const [selectedData, setSelectedData] = useState<SelectedData>({
    country: null,
    season: null,
    league: null,
    team: null,
  });

  useEffect(() => {
    if(location.state && location.state.countries){
      setCountries(location.state.countries);
    }
  }, [location]);

  
  const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    setSelectedData(prev => ({
      ...prev,
      [type]: event.target.value
    }))
  };

  console.log("ASDx: ", teams);

  return (
    <div className={styles.teams}>
      <div>Voltar</div>
      <div className={styles["teams__team-selection"]}>
        <div>
          <label>Selecione o pais: </label>
          <select onChange={(e) => handleChangeState(e, "country")}>
            {
              countries && countries.map((country) => (
                <option value={country.name} onClick={() => setTeams(country)}>{country.name}</option>
              ))
            }
          </select>
          <div>
            {/* <h2>{ selectedData.country && selectedData.country.name }</h2>
            <img src={ selectedData.country && selectedData.country.img } alt={`${'text'} flag`} /> */}
          </div>
        </div>
        <div>
          <label>Selecione a temporada: </label>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div>
          <label>Selecione uma liga: </label>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div>
          <label>Selecione um time: </label>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Home;
