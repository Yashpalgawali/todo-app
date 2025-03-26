import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
 
export default function LoginComponent() {

    const authContext = useAuth()

    const [username, setUsername] = useState('in28minutes')

    const [password,setPassword] = useState('dummy')

    const navigate = useNavigate();

    function handleUsernameChange(event){
        console.log(event.target.value)
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    
    const [showSuccessMessage , setshowSuccessMessage] = useState(false)
    const [showErrorMessage , setshowErrorMessage] = useState(false)

    async function handleSubmit() {
        if(await authContext.login(username,password)) {
            navigate(`/welcome/${username}` )
        }
        else {
            setshowErrorMessage(true)
        }
    }

    return(
        <div className="Login">
          <h1>Time to Login!!</h1>
           {showSuccessMessage && <div className='successMessage'>Authenticated Successfully</div> }
           {showErrorMessage && <div className='errorMessage alert alert-danger'>Authenticated Failed.Please Check Credentials</div>}
            <div className="LoginForm">
            <div className="username">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} placeholder="Enter username "/>
                </div>
                <div className="username">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password "/>
                </div>
                <div><button type="button" onClick={handleSubmit} className="btn btn-success">Login</button></div>
            </div>
        </div>
    )
}