import { useEffect, useState } from "react"
import { useAuth } from "./Security/AuthContext"
import { useNavigate } from "react-router-dom"
import { Box, Button, TextField } from "@mui/material"

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
                        sessionStorage.clear()
                    }, 3000);
                }
                if(sessionStorage.getItem('response')!='')
                {
                    setErrorMessage('')
                    setSuccessMessage(sessionStorage.getItem('response'))
                    setTimeout(() => {
                        setSuccessMessage('')
                        sessionStorage.removeItem('response')
                        sessionStorage.clear()
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

             <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
                noValidate
                autoComplete="off"
            >
                 <TextField id="outlined-basic" type="text" onChange={handleUsernameChange} label="Username" variant="outlined" />
            </Box>

             <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
                noValidate
                autoComplete="off"
                
            >
                 <TextField id="outlined-basic" type="password" onChange={handlePasswordChange} label="Password" variant="outlined" />
            </Box>
            {/* <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={handleUsernameChange} placeholder="Enter Username" className="form-control" />
            </div>  
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handlePasswordChange} placeholder="Enter Password" className="form-control" />
            </div> */}
            <div>
                <Button variant="contained" color="success" className="m-3" onClick={handleLogin}> Login</Button>
                 {/* <button type="button" className="btn btn-success m-3" onClick={handleLogin}>LOGIN</button> */}
            </div>
         </div>        
    )
}