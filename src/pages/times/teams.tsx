import React, { useState, useEffect, useMemo } from 'react';
import styles from "./teams.module.scss";

import { useFootballApi } from '../../hooks/useFootballAPI';
import {useLocation} from 'react-router-dom';
import { Country, League, Season, Team, Statistics } from '../../types';
import CustomSelect from '../../components/customSelect/customSelect';
import { format } from "date-fns";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

interface SelectedData {
  country: Country | null,
  season: Season | null,
  league: League | null,
  team: Team | null,
}

interface LeaguesData {
  country: Country,
  league: League,
  seasons: Season,
}

const Home = () => {

  const location = useLocation();
  const client = useFootballApi();

  const [countries, setCountries] = useState<Country[]>();
  const [seasons, setSeasons] = useState<Season[]>();
  const [leagues, setLeagues] = useState<LeaguesData[]>([]);
  const [teams, setTeams] = useState<Team[]>();
  const [players, setPlayers] = useState<any[]>();
  const [statistics, setStatistics] = useState<Statistics>();

  const [selectedData, setSelectedData] = useState<SelectedData>({
    country: null,
    league: null,
    season: null,
    team: null,
  });

  useEffect(() => {
    if(location.state && location.state.countries){
      setCountries(location.state.countries);
    }
  }, [location]);

  useEffect(() => {
    if(selectedData.country && leagues.length === 0){
      client("leagues").then((res) => {

        if(res.errors.length === 0){
          setLeagues(res.response);
        } else {

        }
      })
    }
  }, [selectedData.country, leagues]);

  useEffect(() => {
    if(selectedData.country && selectedData.league && selectedData.season && !teams){
      client(`teams?league=${selectedData.league.id}&season=${selectedData.season.year}`).then((res) => {
        
        if(res.errors.length === 0){
          setTeams(res.response);
        } else {

        }
      })
    }
  }, [selectedData]);

  useEffect(() => {
    if(selectedData.country && selectedData.league && selectedData.season && selectedData.team){
      client(`players?team=${selectedData.team.team.id}&season=${selectedData.season.year}`).then((res) => {
        console.log("PLAYERS: ", res);
        if(res.errors.length === 0){
          setPlayers(res.response);
        } else {

        }
      })

      client(`/teams/statistics?team=${selectedData.team.team.id}&season=${selectedData.season.year}&league=${selectedData.league.id}`).then((res) => {
        console.log("STATISTICS: ", res);
        if(res.errors.length === 0){
          setStatistics(res.response);
        } else {

        }
      })
    }
  }, [selectedData]);

  const handleChangeState = (event: any, type: string) => {
    setSelectedData(prev => ({
      ...prev,
      [type]: event
    }));
  };

  const filteredLeagues = useMemo(() => {
    return leagues.filter((item: any) => item.country.name === selectedData.country?.name);
  }, [selectedData, leagues]);

  const handleGoBack = () => {
    if(selectedData.team){
      setSelectedData(prev => ({
        ...prev,
        team: null
      }))
    } else if (selectedData.season){
      setSelectedData(prev => ({
        ...prev,
        season: null
      }))
    } else if (selectedData.league){
      setSelectedData(prev => ({
        ...prev,
        league: null
      }))
    } else {
      setSelectedData(prev => ({
        ...prev,
        country: null
      }))
    }
  };

  const monstUsedLineups = () => {
    if(statistics && statistics.lineups.length > 0){
      const mostUsedLineup = statistics.lineups?.reduce((prev, current) => (prev.played > current.played) ? prev : current);
      return mostUsedLineup.formation;
    } else {
      return "";
    }
  }

  const renderLineChart = () => {

    const x = Object(statistics?.goals.for.minute).entries();
    console.log("XXX: ", x);

    return (
      <LineChart width={400} height={400} data={[{name: 'Page A', uv: 400 }, { name: "Pabe B", uv: 200 }]}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    )
  }


  console.log("AWS: ", statistics);

  return (
    <div className={styles.teams}>
      <div className={styles["teams__selection-container"]}> 
        <div className={styles['teams__go-back-button']} onClick={handleGoBack}>Voltar</div>
        <div className={styles["teams__selection-item"]}>
          <CustomSelect
            inputValue={selectedData.country?.name}
            dataName='País'
            resultContent={
              <>
                <p>{ selectedData.country && selectedData.country.name }</p>
                <img src={ selectedData.country ? selectedData.country.flag : "" } alt={`${selectedData.country?.name} flag`} />
              </>
            }
          >
            {
              countries && countries.map((country) => (
                <li key={country.name} onClick={() => handleChangeState(country, "country")}>{country.name}</li>
              ))
            }
          </CustomSelect>
        </div>
        <div className={styles["teams__selection-item"]}>
          <CustomSelect
            inputValue={selectedData.league?.name}
            isDisabled={!selectedData.country}
            dataName='Liga'
            resultContent={
              <>
                <p>{ selectedData.league && selectedData.league.name }</p>
                <img src={ selectedData.league ? selectedData.league.logo : "" } alt={`${selectedData.league?.name} flag`} />
              </>
            }
          >
            {
              leagues && filteredLeagues.map((league) => (
                <li
                  key={league.league.name}
                  onClick={() => {
                    //@ts-ignore
                    setSeasons(league.seasons);
                    handleChangeState(league.league, "league");
                  }}
                >
                  {league.league.name}
                </li>
              ))
            }
          </CustomSelect>
        </div>
        <div className={styles["teams__selection-item"]}>
          <CustomSelect
            inputValue={selectedData.season?.start}
            isDisabled={!selectedData.league}
            dataName='Temporada'
            resultContent={
              <>
                { selectedData.season && <p>{ format(new Date(selectedData.season.end), "yyyy") }</p>}
              </>
            }
          >
            {
              seasons && seasons.map((season) => (
                <li key={season.start} onClick={() => handleChangeState(season, "season")}>
                  <p>{ format(new Date(season.start), "yyyy") }</p>
                </li>
              ))
            }
          </CustomSelect>
        </div>
        <div className={styles["teams__selection-item"]}>
          <CustomSelect
            inputValue={selectedData.team?.team.name}
            isDisabled={!selectedData.country}
            dataName='Time'
            resultContent={
              <>
                <p>{ selectedData.team && selectedData.team.team.name }</p>
                <img src={ selectedData.team ? selectedData.team.team.logo : "" } alt={`${selectedData.team?.team.name} flag`} />
              </>
            }
          >
            {
              teams && teams.map((team) => (
                <li
                  key={team.team.name}
                  onClick={() => {
                    //@ts-ignore
                    handleChangeState(team, "team");
                  }}
                >
                  {team.team.name}
                </li>
              ))
            }
          </CustomSelect>
        </div>
      </div>

      { selectedData.team &&
        <div className={styles['teams__team-data-container']}>
          <div className={styles['teams__team-data-container__team-info']}>
            <h1>{selectedData.team?.team.name}</h1>
            <img src={ selectedData.team ? selectedData.team.team.logo : "" } alt={`${selectedData.team?.team.name} flag`} />
          </div>

          <div className={styles['teams__team-data-container__players']}>
            <h2>Jogadores</h2>
            <ul>
              {
                players && players.map((player) => (
                  <li key={player.player.id}>
                    <img src={player.player.photo} alt={`${player.player.name}`} />
                    <div>
                      <p>{player.player.name}</p>
                      <p>Idade: {player.player.age}</p>
                      <p>Nacionalidade: {player.player.nationality}</p>
                    </div>
                  </li>
                ))
              }
              
            </ul>
          </div>

          <div className={styles['teams__team-data-container__lineups']}>
            <h2>Formação mais utilizada na temporada:</h2>
            <p>{ monstUsedLineups() }</p>
          </div>

          <div className={styles['teams__team-data-container__results']}>
            <h2>Resultados</h2>
            <div>
              <p>Jogos: {statistics?.fixtures.played.total}</p>
              <p>Vitórias: {statistics?.fixtures.wins.total}</p>
              <p>Derrotas: {statistics?.fixtures.loses.total}</p>
              <p>Empates: {statistics?.fixtures.draws.total}</p>
            </div>
          </div>

          <div>
            <h2>Gols por tempo de jogo</h2>
            { renderLineChart() }
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
