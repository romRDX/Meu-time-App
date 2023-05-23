import React, { useState, useEffect, useMemo } from 'react';
import styles from "./teams.module.scss";

import { useFootballApi } from '../../hooks/useFootballAPI';
import {useLocation} from 'react-router-dom';
import { Country, League, Season, Team } from '../../types';
import CustomSelect from '../../components/customSelect/customSelect';
import { format } from "date-fns";

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
        console.log("XXX: ", res);
        if(res.errors.length === 0){
          setTeams(res.response);
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

  console.log("AWS: ", teams);

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
                <p>{ selectedData.country && selectedData.country?.name }</p>
                <img src={ selectedData.country ? selectedData.country?.flag : "" } alt={`${'text'} flag`} />
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
                <img src={ selectedData.league ? selectedData.league.logo : "" } alt={`${'text'} flag`} />
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
                {/* { selectedData.season && <p style={{ fontSize: "18px" }}>{ format(new Date(selectedData.season.start), "dd/LL/yyyy - ") }</p>}
                { selectedData.season && <p style={{ fontSize: "18px" }}>{ format(new Date(selectedData.season.end), "- dd/LL/yyyy") }</p>} */}
                { selectedData.season && <p>{ format(new Date(selectedData.season.end), "yyyy") }</p>}
              </>
            }
          >
            {
              seasons && seasons.map((season) => (
                <li key={season.start} onClick={() => handleChangeState(season, "season")}>
                  {/* <p>{ format(new Date(season.start), "dd/LL/yyyy") }</p> */}
                  {/* <p>{ format(new Date(season.end), "dd/LL/yyyy") }</p> */}
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
                <img src={ selectedData.team ? selectedData.team.team.logo : "" } alt={`${'text'} flag`} />
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
      <div>teste</div>
    </div>
  );
}

export default Home;
