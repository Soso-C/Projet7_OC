import "../src/styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./Context/UserContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      {/* Si le localStorage contient quelque chose alors cela veut dire que notre user est auth alors on montre tel ou tel routes (provisoire) */}
      {localStorage.length > 0 ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil/:id" element={<Profil />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
