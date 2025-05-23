import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCovCenterById, saveCovCenter, updateCovCenter } from "../api/CovCenterApiService";


export default function AddCovCenter() {

    const [btnValue ,setBtnValue ] = useState('Add CovCenter')
    const [covcenter_name,setCovcenterName ] = useState('')
    const [covcenter_id,setCovcenterId] = useState('')

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(
        () => retrieveCovCenterById 
    )

    function retrieveCovCenterById() {
       
        if(id != -1) {
            
            setBtnValue('Update Cov Center')
            getCovCenterById(id).then((response) => {
                setCovcenterId(response.data.covcenter_id)
                setCovcenterName(response.data.covcenter_name)
            }).catch((error)=>{
                sessionStorage.setItem('reserr',error.response.data.errorMessage)
                navigate('/covcenters')
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
            sessionStorage.setItem('response','Cov center is saved successfully')
            navigate(`/covcenters`)
        }).catch((error) => {
            sessionStorage.setItem('reserr','Cov center is not saved')
            navigate(`/covcenters`)
        })
    }
    else {
        let covcenter = {
            covcenter_id : id , covcenter_name : values.covcenter_name
        }
        updateCovCenter(covcenter).then((response)=>{
            sessionStorage.setItem('response','Cov center '+covcenter_name+' is updated to '+covcenter.covcenter_name+' successfully')
            navigate(`/covcenters`)
        }).catch((error) => {
            sessionStorage.setItem('reserr','Cov center '+covcenter_name+' is not updated ')
            navigate(`/covcenters`)
        })
    }

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