import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createCompany, retrieveCompanyById, updateCompany } from "../api/CompanyApiService"
import { ErrorMessage, Field, Formik,Form } from "formik"

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
                setCompName(response.data.comp_name)
                setCompId(response.data.comp_id)
            })
        }
         
    }

      function onSubmit(values) {
            const company = {
                comp_id : id , comp_name: values.comp_name
            }
           
            if(id== -1)
            {
                createCompany(company)
                    .then((response)=> {
                            sessionStorage.setItem('response',response.data.comp_name+' is saved successfully')
                             
                            navigate('/viewcompanies')
                        })
                    .catch((error) => alert('error is '+error)) 
            }
            else {
                updateCompany(company)
                    .then((response)=> {
                           sessionStorage.setItem('response',company.comp_name+' is UPDATED successfully')
                           navigate('/viewcompanies')
                    })
                    .catch((error) => alert('error is '+error))
            }
         }
   
 
   function validate(values) {
    let errors = {
      //  comp_name : 'Enter valid comp Name'
    }
    
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
                        <ErrorMessage 
                            name='comp_name'
                            component="div"
                            className="alert alert-warning"
                        />
                        <fieldset>
                            <label  >Company</label>
                            <Field type="text" name="comp_name" className="form-control"></Field>
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