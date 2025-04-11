import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDepartmentById, saveDepartment, updateDepartment } from "../api/DepartmentApiService"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { retrieveAllCompanies, retrieveCompanyById } from "../api/CompanyApiService"

export default function DepartmentComponent() {
    
    const {id} = useParams()

    const [btnValue,setBtnValue] = useState('Add Department')
 
    const [department,setDepartment] = useState({
        dept_id : '',
        dept_name : ''
    })
    
    const navigate = useNavigate()
    const [companies,setCompanies] = useState([])

    useEffect(() => retrieveDepartmentById() ,[id] )
    
    function retrieveDepartmentById() { 
        retrieveAllCompanies().then((response)=>{
            setCompanies(response.data)            
        })
        if(id != -1)
        {
           setBtnValue('Update Department')
           getDepartmentById(id).then((response) => {
                setDepartment({
                    dept_id : response.data.dept_id,
                    dept_name : response.data.dept_name
                })
           })
        }
    }

    function validate(values) {
        let errors ={}
        // if(values.dept_name.length <1) {
        //     errors.dept_name='Department Name should be at least 2 characters'
        // }
        return errors
    }
 
    function onSubmit(values) {
        
        retrieveCompanyById(values.companies).then((response) => {
             const compObj = {
                comp_id   : response.data.comp_id,
                comp_name : response.data.comp_name
             }
            const dept = {
                dept_id : values.department.dept_id , dept_name : values.department.dept_name , company : compObj
            }
            if(id == -1) {
                saveDepartment(dept).then((response)=> {
                    sessionStorage.setItem('response',dept.dept_name+' is saved successfully')
                    navigate(`/viewdepartments`)
                }).catch((error) => {
                    sessionStorage.setItem('response',dept.dept_name+' is not saved')
                    navigate(`/viewdepartments`)
                })
            }
            else {
                    updateDepartment(dept).then((response)=> {
                        console.log(response)
                        sessionStorage.setItem('response',dept.dept_name+' is updated successfully')
                        navigate(`/viewdepartments`)
                    }).catch((error) => {
                        sessionStorage.setItem('reserr',dept.dept_name+' is not updated')
                        navigate(`/viewdepartments`)
                    })
                }
            
            })
       
    }

    return(
        <div className="container">
            <h1>{btnValue}</h1>        
        <div>
            <Formik
                initialValues={ { department , companies:'' } }
                enableReinitialize={true}
                validate={validate}
                onSubmit={onSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    (props)=> (
                        <Form>
                            <fieldset className="form-group">
                            <label>Select Company </label>
                            <Field className="form-control" name="companies" as="select" >
                                <option>Please Select Company Name</option>
                                {
                                 companies.map(
                                    (company) =>(
                                        <option key={company.comp_id} value={company.comp_id}>{company.comp_name}</option>
                                    )
                                 )   
                                }
                            </Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="companies"/>
                        </fieldset>
                            <fieldset>
                            <label>Department Name</label>
                            <Field className="form-control" name="department.dept_name"  type="text"></Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="dept_name"/>
                        </fieldset>
                            <div><button type="submit" className="btn btn-primary m-3">{btnValue}</button></div>
                        </Form>
                    )
                }
            </Formik>
        </div>
        </div>
    )
    
}