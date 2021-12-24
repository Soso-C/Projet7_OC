import React from "react";
import NewSearchBar from "../components/SearchBar/NewSearchBar";
import ProfileMain from "../components/ProfileComponents/ProfileMain/ProfileMain";
import { useState, useEffect } from "react";
import Axios from "axios";

const Profil = () => {

  const test1 = JSON.parse(localStorage.getItem("token"));


  const [userData, setUserData] = useState([]);

  // On récupere toutes les infos de notre userID qu'on passera en props pour pouvoir les exploiter dans notre futur component.
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/user/profil/${test1.userId}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      setUserData(res.data[0])
    });
  }, [test1.token, test1.userId]);

  return (
    <>
      <NewSearchBar />
      {/* On passe la data (userData) en props a notre composant enfant qu'on a recupéré via le useEffect pour pouvoir exploiter ces données dans ce composant*/}
      <ProfileMain user={userData} />  
    </>
  );
};

export default Profil;
