import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCovCenDoctorById } from "../api/CovCenDoctorApiService"
import { getAllCovCenDepartments } from "../api/CovCenterDepartmentApiService"
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function CovCenDoctor() {
        const [btnValue ,setBtnValue ] = useState('Add CovCen Doctor')
        const [covcendoc_name,setCovCenDocName ] = useState('')
        const [covcendoc_id,setCovCenDocId] = useState('')
        const [covcendeptlist,setCovCenDeptList] = useState('')

        const {id} = useParams()
    
        const navigate = useNavigate()
    
        useEffect(
            () => retrieveCovCenDoctorById
        )

        function retrieveCovCenDoctorById()
        {
            getAllCovCenDepartments().then((response)=>{
                setCovCenDeptList(response.data)
            })

            if(id != -1) {
                setBtnValue('Update CovCen Doctor')
                getCovCenDoctorById(id).then((response)=> {
                    setCovCenDocName(response.data.covcendoc_name)
                    setCovCenDocId(response.data.covcendoc_id)
                })
            }
        }

        function validate(values) {
                let errors= { }
                
                return errors
            }
            
            function onSubmit(values) {         
                let dept = {
                        covcendept_name : values.covcendept_name , covcendept_id : id , 
                        covcenter : { 
                            covcenter_id : values.covcenter
                        }
                }
                
                saveCovCenDepartment(dept).then((response)=> {
                    sessionStorage.setItem('response','Department '+dept.covcendept_name+' is saved successfully')
                    navigate(`/covcendepts`)
                }).catch((error)=> {
                    sessionStorage.setItem('reserr','Department '+dept.covcendept_name+' is not saved')
                    navigate(`/covcendepts`)
                })
            }
    
    return(
        <div className="container">
            <h1 className="text-center">{btnValue}</h1>

            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { }}
                    validate={validate}
                    onSubmit={onSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset>
                                    <label htmlFor="covcendoc_name">DocName</label>
                                    <Field type="text" name="covcendoc_name" placeholder="Enter Name" ></Field>
                                    <ErrorMessage component="div" name="covcendoc_name" className="alert alert-warning" />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="covcendoc_name">Department</label>
                                    <Field as="select" name="covcendoc_name" placeholder="Enter Name" ></Field>
                                    <ErrorMessage component="div" name="covcendoc_name" className="alert alert-warning" />
                                </fieldset>
                                <div><button type="submit" className="btn btn-success m-3">{btnValue}</button></div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}