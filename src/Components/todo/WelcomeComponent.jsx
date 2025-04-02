import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"
import { retrieveHelloWorldBean ,retrieveHelloWorldBeanPathVariable} from "./api/HelloWorldApiService"
import { useAuth } from "./Security/AuthContext"

export default function WelcomeComponent() {
    // const params = useParams()
    // console.log(params.username)
    const {username} = useParams()
    const authContext = useAuth()
    
    const token = authContext.token

    const [message, setMessage] =useState(null)
    function callHelloWorldRestApi() {
       
    //     axios.get('http://localhost:8080/hello-world')
    //          .then( (response) => successfulResponse(response) )
    //          .catch( (error)=> errorResponse(error) )
    //          .finally(()=> alert('Clean up'))        
    // }
    
        // retrieveHelloWorldBean()        
        //     .then((response) => successfulResponse(response))
        //     .catch((error)=> errorResponse(error))
    
        retrieveHelloWorldBeanPathVariable(username,token)
                .then((response) => successfulResponse(response))
                .catch((error)=> errorResponse(error))
    }

    function successfulResponse(response){
        
        setMessage(response.data.message)
    }

    function errorResponse(error){
        alert(error)
    }

    return(
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div >
               Manage your Todos. <Link  to='/todos'>Go Here</Link>
            </div>
            <div><button className="btn btn-success m-5" onClick={callHelloWorldRestApi}> Call Hello World </button></div>
            <div className="text-info">{message}</div>
        </div>
    )
}