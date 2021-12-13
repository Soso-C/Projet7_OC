import React from "react";
import NewSearchBar from "../components/SearchBar/NewSearchBar";
import ProfileMain from "../components/ProfileComponents/ProfileMain/ProfileMain";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

const Profil = () => {
//   const params = useParams();
//   console.log(params);
//   const test1 = JSON.parse(localStorage.getItem("token"));

//   const [userData, setUserData] = useState([]);

//   // useEffect permet de récupérer la data et de l'afficher une seul fois avec les [].
//   useEffect(() => {
//     Axios.get(`http://localhost:3001/api/user/1`, {
//       headers: { Authorization: `Bearer ${test1.token}` },
//     }).then((res) => {
//       setUserData(res.data);
//       console.log(res.data);
//     });
//   }, []);

  return (
    <div>
      <NewSearchBar />
      <ProfileMain />
    </div>
  );
};

export default Profil;
