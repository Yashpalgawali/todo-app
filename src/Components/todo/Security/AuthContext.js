import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

//1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2: Share the created Context with other components
export default function AuthProvider({ children }) {

    //3:  Put some state in the Context
   
    const [isAuthenticated,setAuthenticated] = useState(false)
    const [username,setUsername] = useState(null)
    const [token,setToken] = useState(null)
    
    // function login(username, password) {
    //     if(username==='in28minutes' && password==='dummy') {
    //         setAuthenticated(true)
    //         setUsername(username)
    //        return true
    //     }
    //     else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    // async function login(username, password) {

    //     const baToken = 'Basic '+ window.btoa(username +":"+ password)
        
    //     try{
    //     const response = await executeBasicAuthenticationService(baToken)
            
    //         if(response.status==200) {
    //             setToken(baToken)
    //             setAuthenticated(true)
    //             setUsername(username)
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('Intercepting a token')
    //                     config.headers.Authorization=baToken
    //                     return config
    //                 }
    //             )
    //             return true
    //         }
    //         else {
    //             logout()
    //             return false
    //         }
    //   }
    //   catch(error) {
    //    logout()
    //     return false
    //   }

    // }

    async function login(username, password) {

        
        try{
        const response = await executeJwtAuthenticationService(username,password)
            
            if(response.status==200) {
                const jwttoken = 'Bearer '+response.data.token
                setToken(jwttoken)
                setAuthenticated(true)
                setUsername(username)
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('Intercepting a token')
                        config.headers.Authorization=jwttoken
                        return config
                    }
                )
                return true
            }
            else {
                logout()
                return false
            }
      }
      catch(error) {
       logout()
        return false
      }

    }

    function logout() {
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }
    return(
        <AuthContext.Provider value={ { isAuthenticated , login, logout,username,token} }>
            {children}
         </AuthContext.Provider>
    )
}