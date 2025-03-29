import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDepartmentById } from "../api/DepartmentApiService"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { retrieveAllCompanies } from "../api/CompanyApiService"

export default function DepartmentComponent() {
    
    const {id} = useParams()

    const [btnValue,setBtnValue] = useState('Add Department')
 
    const [department,setDepartment] = useState({
        dept_id : null,
        dept_name : '',
        company  : {
            comp_id : null,
            comp_name : ''
        }
    })
    const [companies,setCompanies] = useState([])

    useEffect(() => retrieveDepartmentById() ,[id] )
    
    function retrieveDepartmentById() { 
        retrieveAllCompanies().then((response) => { setCompanies(response.data) 
                                                    
                                                })
        if(id != -1)
        {
            setBtnValue('Update Department')            
           

            getDepartmentById(id)
            .then((response) => {
                 const dept = response.data
                  
                 setDepartment({
                    dept_id : dept.dept_id,
                    dept_name : dept.dept_name,
                    company : {
                        comp_id   : dept.company.comp_id,
                        comp_name : dept.company.comp_name 
                    }
                 })
            })
            .catch((error) => console.log(error))
        }
    }

    function validate(values) {
        let errors ={}
        console.log('validate '+values.toString())
        // if(values.department.dept_name=='' || values.department.dept_name==null) {
        //     errors.dept_name = 'Please Enter valid department name'
        // }
        return errors
    }
 
    function onSubmit(values) {
        console.log(values)
        if(id == -1) {
            alert('Create department')
        }
        else {
            alert('Update department')
        }
    }

    return(
        <div className="container">
            <h1>{btnValue}</h1>
            <div>
                <Formik initialValues={ { department } }
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {
                        ({ values, handleChange })=> (
                            <Form>                                
                                <fieldset>
                                    <label>Department</label>
                                    <Field type="text" name="department.dept_name" className="form-control" ></Field>
                                    <ErrorMessage component="div" name="dept_name" className="alert alert-warning" /> 
                                </fieldset>

                                <fieldset>
                                    <label>Company</label>
                                    <Field as="select" name="company" id="company" className="form-control"   >
                                        <option >Please Select Company</option>
                                        {
                                           companies.map(
                                            (company) => {
                                                <option key={company.comp_id} value={company.comp_id} >{company.comp_name}</option>
                                            }
                                           )
                                        }                                     
                                    </Field>
                                    <ErrorMessage component="div" name="comp_name" className="alert alert-warning" /> 
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-4">{btnValue}</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );

}