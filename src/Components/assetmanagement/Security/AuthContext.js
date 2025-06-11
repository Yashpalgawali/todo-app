

// Create a Context

import { createContext, useContext, useState } from "react";
import { executeJwtAuthentication, logoutFunction } from "../api/LoginApiService";
import { apiClient } from "../api/ApiClient";
import { toast } from "react-toastify";

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
  
    try{

     
    const response = await executeJwtAuthentication(basicToken)
    
    if(response.status==200) { 
        const jwtToken = 'Bearer ' + response.data.token; // Important: use `.token` from response
        
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        localStorage.setItem('token',jwtToken)
             
        return true
     }
    }
     catch (error) {
        // toast.error('Server not reachable. Redirecting...', {
        //         onClose: () => {
        //           sessionStorage.setItem('reserr', 'Backend is unreachable. Please try again later.');
        //           window.location.href = '/login';
        //         },
        //       });    
        return false
     }
}

async function logout() {
    
    const response = await logoutFunction(token)
   
    sessionStorage.setItem('response',response.data.message)
    setAuthenticated(false)
    setUsername(null)
      // Clear storage
    localStorage.clear();
    
    return true
}

    return(
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username, token } }>
            { children }
        </AuthContext.Provider>
    )
}