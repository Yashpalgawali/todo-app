import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCovCenWardTypeById, saveCovCenWardType, updateCovCenWardType } from "../api/CovCenWardTypeApiService"
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function CovCenWardType() {
    const [btnValue,setBtnValue] = useState('Add Ward Type')
    const {id} = useParams()
    
    const navigate=useNavigate()

    const [covcenward_type, setCovCenWardType] = useState('')
    const [covcenwardtype_id, setCovCenWardTypeId] = useState('')
    

    useEffect(
        () => retrieveWardTypeById()
    )
    
    function retrieveWardTypeById()
    {
        if(id != -1) {
            setBtnValue('Update CovCenWard')
            getCovCenWardTypeById(id).then((response) => {           
                setCovCenWardType(response.data.covcenward_type)
                setCovCenWardTypeId(response.data.covcenwardtype_id)
            })
        }
    }

    function onSubmit(values) {
        
        if(id== -1) {
            saveCovCenWardType(values).then((response)=> {
                sessionStorage.setItem('response',values.covcenward_type+' is saved successfully')
                navigate(`/covcenwardtypes`)
            }).catch((error)=>{
                sessionStorage.setItem('reserr',values.covcenward_type+' is not saved')
                navigate(`/covcenwardtypes`)
            })
        }
        else {
            let type = {
                 covcenwardtype_id : id , covcenward_type : values.covcenward_type
            }
            updateCovCenWardType(type).then((response)=> {
                sessionStorage.setItem('response',values.covcenward_type+' is updated successfully')
                navigate(`/covcenwardtypes`)
            }).catch((error)=>{
                sessionStorage.setItem('reserr',values.covcenward_type+' is not updated')
                navigate(`/covcenwardtypes`)
            })
        }
    }

    function validate(values) {
        let errors = { }
        if(values.covcenward_type.length<3) {
           errors.covcenward_type = 'Please enter at least 3 characters '
        }
        return errors
    }

    return(
        <div className="container">
            <h1 className="text-center">{btnValue}</h1>

            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { covcenwardtype_id ,covcenward_type} }
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={onSubmit}
                    validate={validate}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset>
                                    <label htmlFor="covcenward_type">Ward Type</label>
                                    <Field type="text" name="covcenward_type" className="form-control" ></Field>
                                     <ErrorMessage  name='covcenward_type' component="div" className="alert alert-warning" />
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