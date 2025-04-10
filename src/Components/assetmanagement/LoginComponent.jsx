import { useState } from "react"

export default function LoginComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword ]= useState('')

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleLogin() {
        alert(username)
    }

    return(
        <div className="container">
            <h1 className="text-center">Time To Login</h1>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={handleUsernameChange} className="form-control" />
            </div>
            <div>
                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" onChange={handlePasswordChange} className="form-control" />
            </div>
            <div><button type="button" className="btn btn-success m-3" onClick={handleLogin}>LOGIN</button></div>
        </div>
    )
}