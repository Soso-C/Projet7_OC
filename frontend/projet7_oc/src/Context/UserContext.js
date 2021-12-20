import { createContext, useState } from "react";

// pas utile ducoup car se remet a 0 lors d'un reload ou changement de page je vais rester sur localStorage.


// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [authState,setAuthState] = useState({
//         id: "",
//         token: "",
//         fullname: "",
//         admin: "",
//     })
//     console.log(authState)

//     return(
//         <AuthContext.Provider value={[authState,setAuthState]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

