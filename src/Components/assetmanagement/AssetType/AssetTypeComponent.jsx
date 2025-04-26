import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAssetTypeById, saveAssetType, updateAssetType } from "../api/AssetTypeApiService"
import { error } from "jquery"

export default function AssetTypeComponent() {

    const [btnValue, setBtnValue] = useState('Add Asset Type')

    const [assetType, setAssetType] = useState({
        type_id : null,
        type_name : ''
    })

    const {id} = useParams()
    const navigate = useNavigate() 

    useEffect(
        () => retrieveAssetTypes() , [id]
    )

    function retrieveAssetTypes() {
        if(id != -1) {
            setBtnValue('Update Asset Type')
            getAssetTypeById(id).then((response)=> {
                setAssetType({
                    type_id : response.data.type_id,
                    type_name : response.data.type_name
                })
            }).catch((error)=> {
               sessionStorage.setItem('reserr',error.response.data.errorMessage)
                navigate(`/viewassettypes`)
            })
        }
    }

    function validate(values) {
        let errors = { }
        
        if(values.type_name.length < 1) {
            errors.type_name = 'Please Enter at least 1 Character(s)'
        }
    
        return errors
       }

    function onSubmit(values) {
        
        const assettype = { type_id : values.type_id, type_name : values.type_name }
        if(id == -1) {
            saveAssetType(assettype).then((response) => {
                sessionStorage.setItem('response','Asset Type '+assetType.type_name+' is saved successfully')
                navigate(`/viewassettypes`)
            })
            .catch((error) => console.log(error))
        }
        else {
            updateAssetType(assettype)
                        .then((response) => {
                                 sessionStorage.setItem('response',assettype.type_name+' is updated successfully') 
                                 navigate(`/viewassettypes`)
                            })
        }
    }

    return(
        <div className="container">
            <h2>{btnValue}</h2>
            <div>
                <Formik
                    initialValues={ {
                        type_id: assetType.type_id,
                        type_name: assetType.type_name,
                    } }
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
                                    <label>Asset Type</label>
                                    <Field className="form-control" id="type_name" name="type_name"></Field>
                                    <ErrorMessage component="div" name="type_name" className="alert alert-warning"/>
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-3" >{btnValue}</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}