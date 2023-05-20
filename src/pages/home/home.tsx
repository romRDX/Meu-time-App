import React, { useState, useEffect } from 'react';
import UserItem from '../../components/userItem/userItem';
import styles from "./home.module.scss";
import { useUsers } from "../../hooks/useAuth";
import Pagination from '../../components/pagination/pagination';
import SearchInput from '../../components/searchInput/searchInput';
import { useFootballApi } from '../../hooks/useFootballAPI';
import Header from '../../components/header/header';

interface Country {
  code: string,
  flag: string,
  name: string,
}

const Home = () => {

  const client = useFootballApi();

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  // useEffect(() => {
  //   client("countries").then((res) => {
  //     console.log("XXX: ", res);
  //     setCountries(res.response);
  //   })
  // }, []);

  return (
    <div className={styles.home}>
      <Header />
        <aside className={styles.home__menu}>
          

          <h1>Bem vindo ao Meu Time, seu site de dados e informações sobre futebol!</h1>
          <select name="countries" onChange={(e) => console.log("HHH: ", e.target.value)}>
            {
              countries?.map((country) => (
                <option value={country.name} key={country.code}>
                  <p>{country.name}/{country.code}</p>
                  <div>
                    <img src={country.flag} alt={`${country.name}-flag`} width="200" height="200" />
                  </div>
                </option>
              ))
            }
          </select>
        </aside>
    </div>
  );
}

export default Home;
