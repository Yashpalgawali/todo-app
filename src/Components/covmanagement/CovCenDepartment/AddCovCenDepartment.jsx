import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getCovCenDepartmentById } from "../api/CovCenterDepartmentApiService"
import { getAllCovCenters } from "../api/CovCenterApiService"

export default function AddCovCenDepartment() {

    const [btnValue, setBtnValue] = useState('Add Department')
    const {id} = useParams()
    const [covcenlist,setCovCenList] = useState([])
    const [covcendept_name,setCovCenDeptName] = useState('')
    const navigate = useNavigate()
    const [covcenter, setCovcenter] = useState('');

    useEffect(
        () => {
            retrieveCovCenDeptByid()
        } ,[id]
    )

    function retrieveCovCenDeptByid() {
        getAllCovCenters().then((response)=>{
            
            setCovCenList(response.data)
        })
        if(id != -1) {
            setBtnValue('Update Department')
            getCovCenDepartmentById(id).then((response)=> {
               setCovCenDeptName(response.data.covcendept_name)
               setCovcenter(response.data.covcenter)
                
            })
            .catch((error) =>{
                console.log(error)
                sessionStorage.setItem('reserr',error.response.data.errorMessage)
                navigate('/covcendepts')
            })
        }
    }

    function validate(values) {
        let errors={}
        
        return errors
    }

    return(
        <div className="container">
            <Formik
                enableReinitialize={true}
                initialValues={ { covcendept_name,covcenter } }
                validate={validate}
            >
                {
                    (props) => (
                        <Form>
                            <fieldset>
                                <label>Select Center </label>
                                <Field className="form-control" name="covcenter" as="select" >
                                <option>Please Select Center</option>
                                {
                                 covcenlist.map(
                                    (center) =>( 
                                        <option key={center.covcenter_id} value={center.covcenter}>{center.covcenter_name}</option>
                                    )
                                 )   
                                }
                            </Field>
                                <ErrorMessage component="div" name="covcenter" className="alert alert-warning" />
                            </fieldset>
                            <fieldset>
                                <label>Department Name</label>
                                <Field type="text" className="form-control" name="covcendept_name" />
                            </fieldset>
                            <div><button type="submit" className="btn btn-success m-3" >{btnValue}</button></div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}