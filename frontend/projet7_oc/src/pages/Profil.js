import React from "react";
import NewSearchBar from "../components/SearchBar/NewSearchBar";
import ProfileMain from "../components/ProfileComponents/ProfileMain/ProfileMain";
import { useState, useEffect } from "react";
import Axios from "axios";

const Profil = () => {

  const test1 = JSON.parse(localStorage.getItem("token"));

  const [userData, setUserData] = useState([]);

  // useEffect permet de récupérer la data et de l'afficher une seul fois avec les [].
  useEffect(() => {
    Axios.get(`http://localhost:3001/api/user/${test1.userId}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      setUserData(res.data[0])
    });
  }, [test1.token, test1.userId]);

  return (
    <div>
      <NewSearchBar />
      <ProfileMain user={userData} />  
    </div>
  );
};

export default Profil;
