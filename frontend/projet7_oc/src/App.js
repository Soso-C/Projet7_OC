import "../src/styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import useContext from "react"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profil from "./pages/Profil";



function App() {

  return (
    <div className="App">
      {/* Si le localStorage contient quelque chose alors cela veut dire (logiquement) que notre user est auth alors on montre tel ou tel routes (provisoire) */}
      {localStorage.length > 0 ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil/mon-profil" element={<Profil />} />
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
