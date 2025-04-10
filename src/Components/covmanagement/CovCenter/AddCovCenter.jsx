import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getCovCenterById, saveCovCenter, updateCovCenter } from "../api/CovCenterApiService";
import { apiClient } from "../api/ApiClient";

export default function AddCovCenter() {

    const [btnValue ,setBtnValue ] = useState('Add CovCenter')
    const [covcenter_name,setCovcenterName ] = useState('')
    const [covcenter_id,setCovcenterId] = useState('')

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(
        () => retrieveCovCenterById , [id]
    )

    function retrieveCovCenterById() {
       
        if(id != -1) {
            
            setBtnValue('Update Cov Center')
            getCovCenterById(id).then((response) => {
                setCovcenterId(response.data.covcenter_id)
                setCovcenterName(response.data.covcenter_name)
            })
        }
        
         
    }
function validate(values) {
    let errors= {}
    if(values.covcenter_name.length<3){
        errors.covcenter_name = 'Please provide at least 4 characters'
    }
    return errors
}

function onSubmit(values) {

   console.log(values)
    if(id == -1) {
        saveCovCenter(values).then((response)=>{
            sessionStorage.setItem('response','COv center is saved successfully')
            navigate(`/covcenters`)
        })
    }
    // else {
    //     updateCovCenter(values).then((response)=>{
    //         sessionStorage.setItem('response','Cov center is updated successfully')
    //         navigate(`/covcenters`)
    //     })
    // }

}
    return(
        <div className="container">
            <h1 className="text-center">{btnValue}</h1>

            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { covcenter_id,covcenter_name }}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset>
                                    <label>Name</label>
                                    <Field type="text" className="form-control" name="covcenter_name" id="covcenter_name" />
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