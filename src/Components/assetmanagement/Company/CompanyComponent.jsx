import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createCompany, retrieveCompanyById, updateCompany } from "../api/CompanyApiService"
import { ErrorMessage, Field, Formik,Form } from "formik"
import { error } from "jquery"

export default function CompanyComponent () {
    
    const {id} =  useParams()
    const [comp_name , setCompName] = useState('')
    const [comp_id ,setCompId] = useState('')
    const navigate = useNavigate()
    
    const [btnValue, setBtnValue] = useState('Add Company')
    
    useEffect(()=> getCompanyById() , [id])
   
    function getCompanyById() {
         
        if(id != -1) {
            setBtnValue('Update Company')
         
            retrieveCompanyById(id).then((response) => {
                alert(response.status)
                setCompName(response.data.comp_name)
                setCompId(response.data.comp_id)
            })
            .catch((error)=>{
                alert(error.response)
                sessionStorage.setItem('reserr',error.response.data.errorMessage)
                navigate(`/viewcompanies`)
            }) 
        }         
    }

      function onSubmit(values) {
            const company = {
                comp_id : id , comp_name: values.comp_name
            }
            
            if(id== -1) {
                createCompany(company)
                    .then((response)=> {
                        console.log(response.data)
                            sessionStorage.setItem('response',response.data.statusMsg)
                            navigate('/viewcompanies')
                        })
                    .catch((error) => {
                        sessionStorage.setItem('reserr',error.data.statusMsg)
                        navigate('/viewcompanies')
                    }) 
            }
            else {
                updateCompany(company)
                    .then((response)=> {console.log(response.data.statusMsg)
                           sessionStorage.setItem('response',response.data.statusMsg)
                           navigate('/viewcompanies')
                    })
                    .catch((error) =>{
                        sessionStorage.setItem('reserr',error.data.statusMsg)
                        navigate('/viewcompanies')
                    })
            }
         }
   
 
   function validate(values) {
    let errors = {  }
    
    if(values.comp_name.length<5) {
        errors.comp_name = 'Please Enter at least 5 Characters'
    }

    return errors
   }

     return (
        <div className="container">
          <h1>{btnValue}</h1>
            <Formik initialValues={ { comp_id,comp_name} }
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
            >
               {
                (props) => (
                    <Form> 
                       
                        <fieldset>
                            <label  >Company</label>
                            <Field type="text" name="comp_name" className="form-control"></Field>
                            <ErrorMessage  name='comp_name' component="div" className="alert alert-warning" />
                        </fieldset>

                        <div>
                            <button type="submit" className="btn btn-success m-3">{btnValue}</button>
                        </div>
                    </Form>
                )
               } 

            </Formik>
        </div>
    ); 
}