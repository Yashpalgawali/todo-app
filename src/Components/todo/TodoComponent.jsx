import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./Security/AuthContext"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function TodoComponent() {

    const authContext = useAuth()
    
    const username = authContext.username
    const navigate = useNavigate()
    const [btnValue, setBtnValue] = useState('Save')
    const {id} =  useParams()
    const [description,setDescription] = useState('')
    const [targetDate ,setTargetDate] = useState('')

    useEffect(() => retrieveTodos(), [id] )

     function retrieveTodos() {
    
        if(id != -1)
         {
            setBtnValue('Update')
            retrieveTodoApi(authContext.username,id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch((error) => console.error(error))
            }
    }

     function onSubmit(values) {
        const todo = {
            id : id , username: username, description: values.description,targetDate: values.targetDate,done:false
        }
       
        if(id== -1)
        {    
            createTodoApi(username,todo)
                .then((response)=> navigate('/todos'))
                .catch((error) => console.log(error)) 
        }
        else {
            updateTodoApi(username,id,todo)
                .then((response)=> navigate('/todos'))
                .catch((error) => console.log(error))
        }
     }

     function validate(values){
        let errors = {
            // description : 'Enter a valid description',
            // targetDate : 'Enter a valid date'
        }
        if(values.description.length<5) {
            errors.description = 'Enter at least 5 Characters'
        }

        if(values.targetDate===null || values.targetDate==='' ) {
            errors.targetDate = 'Enter a Date'
        }

        console.log(values)
        return errors
     }

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={ { description ,targetDate} }
                    enableReinitialize= {true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                   {
                     (props) => (
                         <Form>
                            <ErrorMessage
                                name = 'description'
                                component='div'
                                className="alert alert-warning"
                            />

                            <ErrorMessage
                                name = 'targetDate'
                                component='div'
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label htmlFor="">Description</label>
                                <Field type="text" className="form-control" name="description"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="targetDate">Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"></Field>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5"  type="submit">{btnValue }</button>
                            </div>

                         </Form>
                     )
                   }
                </Formik>
            </div>
        </div>
    )
  }
