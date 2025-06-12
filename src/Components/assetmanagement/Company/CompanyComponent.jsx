import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createCompany, retrieveCompanyById, updateCompany } from "../api/CompanyApiService"
import { ErrorMessage, Field, Formik,Form } from "formik"
import { Button } from "@mui/material"

export default function CompanyComponent () {

    const {id} =  useParams()
    const [comp_name , setCompName] = useState('')
    const [comp_id ,setCompId] = useState('')
    const navigate = useNavigate()
    const [isDisabled, setIsDisabled] = useState(false)
    const [btnValue, setBtnValue] = useState('Add Company')

    useEffect(()=> {
        const getCompanyById = async() => {
             
            if(id != -1) {
            setBtnValue('Update Company')         
            retrieveCompanyById(id).then((response) => {
                setCompName(response.data.comp_name)
                setCompId(response.data.comp_id)
            })
            .catch((error)=> { 
                sessionStorage.setItem('reserr',error.response.data.errorMessage)
                navigate(`/viewcompanies`)
            })
        }
        };

        if(id){
            getCompanyById()
        }
    }, [id] ) 
       

    function onSubmit(values) {
        setIsDisabled(true)
            const company = {
                comp_id : id , comp_name: values.comp_name
            }

            setTimeout(() => {
                setIsDisabled(false)
            }, 1000);

            if(id == -1) {
                createCompany(company)
                    .then((response)=> {
                        sessionStorage.setItem('response',response.data.statusMsg)
                        navigate('/viewcompanies')
                        })
                    .catch((error) => {   
                        sessionStorage.setItem('reserr',error.response.data.comp_name)
                        navigate('/viewcompanies')
                    }) 
            }
            else {
                updateCompany(company)
                    .then((response)=> {
                        sessionStorage.setItem('response',response.data.statusMsg)
                        navigate('/viewcompanies')
                    })
                    .catch((error) => {
                        sessionStorage.setItem('reserr',error.response.data.comp_name)
                        navigate('/viewcompanies')
                    })
            }
         }
  
   function validate(values) {
        let errors = { }
  
        if(values.comp_name.length<=3) {
            errors.comp_name = 'Please Enter at least 2 Characters'
        }

        return errors
   }

     return (
        <div className="container">
          <h2>{btnValue}</h2>
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
                            <label htmlFor="comp_name" >Company</label>
                            <Field type="text" name="comp_name" className="form-control" placeholder="Enter Company name" ></Field>
                            <ErrorMessage  name='comp_name' component="div" className="alert alert-warning" />
                        </fieldset>
 
                        <div>
                            <Button type="submit" disabled={isDisabled} variant="contained" color="primary" className="m-3">{btnValue}</Button>
                        </div>
                    </Form>
                )
               }
            </Formik>
        </div>
    ); 
}