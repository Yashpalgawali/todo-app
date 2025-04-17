import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCovCenDoctorById, saveCovCenDoctor, updateCovCenDoctor } from "../api/CovCenDoctorApiService"
import { getAllCovCenDepartments, getCovCenDepartmentById } from "../api/CovCenterDepartmentApiService"
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function CovCenDoctorComponent() {
        const [btnValue ,setBtnValue ] = useState('Add CovCen Doctor')
        const [covcendoc_name,setCovCenDocName ] = useState('')
        const [covcendoc_id,setCovCenDocId] = useState('')
        const [covcendeptlist,setCovCenDeptList] = useState([])

        const {id} = useParams()
    
        const navigate = useNavigate()
    
        useEffect(
            () => retrieveCovCenDoctorById ,[]
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
                
                if(values.covcendoc_name.length < 3) {
                    errors.covcendoc_name = 'Please enter at least 3 characters' 
                }
                return errors
            }
            
            function onSubmit(values) {         
                 console.log(values)
                 let covcendept = { covcendept_id :'', covcendept_name :''  }

                 let covcendoc = {
                    covcendoc_id : id, covcendoc_name : values.covcendoc_name, covcendept : covcendept
                 }
                 getCovCenDepartmentById(values.covcendept_id).then((response) => {
                    covcendept.covcendept_id = response.data.covcendept_id
                    covcendept.covcendept_name = response.data.covcendept_name
                 })
                 if(id == -1) {
                    saveCovCenDoctor(covcendoc).then((response) => {
                        sessionStorage.setItem('response','Doctor '+covcendoc.covcendoc_name+' is saved successfully')
                        navigate(`/covcendocs`)
                    })
                    .catch((response) => {
                        sessionStorage.setItem('reserr','Doctor '+covcendoc.covcendoc_name+' is not saved')
                        navigate(`/covcendocs`)
                    })
                 }
                 else {
                    console.log('In update ',covcendoc)
                    alert('updated')
                    // updateCovCenDoctor(covcendoc).then((response) => {
                    //     sessionStorage.setItem('response','Doctor '+covcendoc.covcendoc_name+' is updated successfully')
                    //     navigate(`/covcendocs`)
                    // })
                    // .catch((response) => {
                    //     sessionStorage.setItem('reserr','Doctor '+covcendoc.covcendoc_name+' is not updated')
                    //     navigate(`/covcendocs`)
                    // })
                 }
            }
    
    return(
        <div className="container">
            <h1 className="text-center">{btnValue}</h1>

            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { covcendoc_name }}
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
                                    <Field type="text" name="covcendoc_name" className="form-control" placeholder="Enter Name" ></Field>
                                    <ErrorMessage component="div" name="covcendoc_name" className="alert alert-warning m-2" />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="covcendept_id">Department</label>
                                    <Field as="select" name="covcendept_id"  className="form-control"  >
                                        <option>Please Select Department </option>
                                        {
                                            covcendeptlist.map(
                                                (dept) => (
                                                    <option key={dept.covcendept_id} value={dept.covcendept_id} >{dept.covcendept_name}</option>
                                                )
                                            )
                                        }
                                    </Field>
                                    <ErrorMessage  component="div" name="covcendoc_id" className="alert alert-warning " />
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