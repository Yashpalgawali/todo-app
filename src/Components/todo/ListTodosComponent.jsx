import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsername, retrieveAllTodosForUsernameApi } from "./api/TodoApiService"
import { useAuth } from "./Security/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"

export default function ListTodosComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear()+12,today.getMonth(), today.getDay())

    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username
    const [todos, setTodos] = useState([])

      useEffect(
        () =>  refreshTodos(), []
      )
            
       function refreshTodos() {
            retrieveAllTodosForUsernameApi(username)
            .then((response) => {
                   setTodos(response.data)
                })
            .catch((error) => console.log(error))
       }     
    
    
       const [successMessage ,setSuccessMessage]  = useState('')
    
       function deleteTodo(id){
        deleteTodoApi(username,id)
        .then((response) => {
            setSuccessMessage(`Delete Todo with id ${id} successful `)
            refreshTodos()
        })
    .catch((error) => console.log(error))
}

function updateTodo(id) {
    navigate(`/todo/${id}`)
}

function addNewTodo() {
    navigate(`/todo/-1`)
}

    return(
        <div className="container"> 
          <h1>Things you want to do!!</h1>
          {successMessage && <div className="text-center alert alert-success">{successMessage}</div>} 
          <div>
            Todo Details
            <table className='table table-striped table-hover' >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Is Done?</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>UPDATE</th>
                    </tr>
                </thead>
                <tbody>                   
                        {
                            todos.map(
                                todo => (
                                    <tr key={ todo.id }>
                                        <td>{ todo.id }</td>
                                        <td>{ todo.description }</td>
                                        <td>{ todo.done.toString() }</td>
                                        <td>{ todo.targetDate.toString() }</td>
                                        <td> <button className="btn btn-warning" onClick={()=>deleteTodo(todo.id) } >DELETE</button> </td>
                                        <td> <button className="btn btn-success" onClick={()=>updateTodo(todo.id) } >UPDATE</button> </td>
                                    </tr>
                                )
                            )
                        }
                    
                </tbody>
            </table>
          </div>
          <div>
            <button type="submit" className="btn btn-success m-3 " onClick={addNewTodo}>Add Todo</button>
          </div>
        </div>
    )
}