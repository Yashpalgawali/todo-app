import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { retrieveAllCompanies } from "../api/CompanyApiService"
import { getDepartmentByCompanyId } from "../api/DepartmentApiService"

export default function EmployeeComponent() {
    const [btnValue,setBtnValue] = useState('Add Employee')

    const [deptlist,setDeptList] = useState([])
    const [compList,setCompList] = useState([])

    const {id} = useParams()

    useEffect(
        ()=>   retrieveEmployeeById() , [id]        
    )

    function retrieveEmployeeById() {
        retrieveAllCompanies().then((response) => {
            setCompList(response.data)
        })
        if(id != -1) {
            setBtnValue('Update Employee')
        }
        else {

        }
    }


    function handleCompanyChange(event){
        getDepartmentByCompanyId(event.target.value).then((response) => setDeptList(response.data))
    }
    return(
        <div className="container">
            <h1>{btnValue}</h1>
            <div>
                <Formik>
                    {
                        (props) =>(
                            <Form>
                                <fieldset>
                                    <label>Employee Name</label>
                                    <Field type="text" name="emp_name" className="form-control"></Field>
                                    <ErrorMessage component="div" name="emp_name" className="alert alert-warning"/>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="">Company</label> 
                                    <Field as="select" className="form-control" name="company" onChange={handleCompanyChange}>
                                        <option>Please select Company</option>
                                        {
                                            compList.map(
                                                (company) =>( 
                                                    <option value={company.comp_id} key={company.comp_id}>{company.comp_name}</option>
                                                )
                                            )
                                        }
                                    </Field>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="">Department</label> 
                                    <Field as="select" className="form-control" name="department"  >
                                        <option>Please select Department</option>
                                        {
                                            deptlist.map(
                                                (dept) =>( 
                                                    <option value={dept.dept_id} key={dept.dept_id}>{dept.dept_name}</option>
                                                )
                                            )
                                        }
                                    </Field>
                                </fieldset>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}