import { useCallback } from "react";
import { useAuth } from "./useAuth";

export const useFootballApi = () => {

  const { userKey } = useAuth();

  const handleApiCall = useCallback((endpoint: string, key: string = "") => {

    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", key || userKey);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    //@ts-ignore
    return fetch(`https://v3.football.api-sports.io/${endpoint}`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
  }, [userKey]);
  
  return handleApiCall;
};

