import { useEffect, useState } from "react"
import { useAuth } from "./Security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword ]= useState('')
    
    const authContext = useAuth()
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => {
            if(sessionStorage.getItem('reserr')!='')
                {
                    setSuccessMessage('')
                    setErrorMessage(sessionStorage.getItem('reserr'))
                    setTimeout(() => {
                        setErrorMessage('')
                        sessionStorage.removeItem('reserr')
                    }, 3000);
                }
                if(sessionStorage.getItem('response')!='')
                {
                    setErrorMessage('')
                    setSuccessMessage(sessionStorage.getItem('response'))
                    setTimeout(() => {
                        setSuccessMessage('')
                        sessionStorage.removeItem('response')
                    }, 3000);
                }
        }
    )

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleLogin() {
         if(await authContext.login(username,password)) {
             navigate(`/viewassignedassets`)
         }
         else {
            setErrorMessage('Invlid Credentials!!')
         }
    }

    return(
        <div className="container">
            <h1 className="text-center">Time To Login</h1>
            { errorMessage && <div className="alert alert-warning">{errorMessage}</div> }
            { successMessage && <div className="alert alert-success">{successMessage}</div> }
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={handleUsernameChange} className="form-control" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handlePasswordChange} className="form-control" />
            </div>
            <div><button type="button" className="btn btn-success m-3" onClick={handleLogin}>LOGIN</button></div>
        </div>
    )
}