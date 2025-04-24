

// Create a Context

import { createContext, useContext, useState } from "react";
import { executeJwtAuthentication } from "../api/LoginApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


// Share the created context with other components

export default function AuthProvider({ children  }) {

// Put state in context
const [isAuthenticated,setAuthenticated] = useState(false)

const [username,setUsername] = useState(null)
const [token ,setToken] = useState(null)
// function login(username, password) {
//     if(username=='admin' && password=='admin') {
//         setAuthenticated(true)
//         setUsername(username)
//         return true
//      }
//      else{
//         setAuthenticated(false)
//         return false
//      }
// }

async function login(username, password) {

    let basicToken = 'Basic '+btoa(username+':'+password)
    
    const response = await executeJwtAuthentication(basicToken)

    if(response.status==200) { 
        const jwtToken = 'Bearer ' + response.data.token; // Important: use `.token` from response
        console.log(jwtToken)
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
  
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true
     }
     else{       
        return false
     }
}

function logout() {
    setAuthenticated(false)
    setUsername(null)
}

    return(
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username, token } }>
            { children }
        </AuthContext.Provider>
    )
}