import {  useAuth } from "./Security/AuthContext"

export default function LogoutComponent() {

    const authContext = useAuth()
    
    return(
        <div className="LogoutComponent">
           <h1>You are Logged Out!!</h1>
           <div>Thank you for using our App</div>
        </div>
    )
}