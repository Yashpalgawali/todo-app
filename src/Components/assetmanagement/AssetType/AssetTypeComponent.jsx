import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAssetTypeById, saveAssetType, updateAssetType } from "../api/AssetTypeApiService"
import { Button } from "@mui/material"

export default function AssetTypeComponent() {

    const [btnValue, setBtnValue] = useState('Add Asset Type')

    const [assetType, setAssetType] = useState({
        type_id : null,
        type_name : ''
    })

    const {id} = useParams()
    const navigate = useNavigate() 

    useEffect(
        () => {
            const retrieveAssetTypes = async () => {
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
            if(id) {
                retrieveAssetTypes()
            }
    }, [id] )
 
   

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
                sessionStorage.setItem('response',response.data.statusMsg)
                navigate(`/viewassettypes`)
            })
            .catch((error) => {
                sessionStorage.setItem('reserr',error.data.statusMsg)
                navigate(`/viewassettypes`)
            })
        }
        else {
            updateAssetType(assettype)
                        .then((response) => {
                                 sessionStorage.setItem('response',response.data.statusMsg) 
                                 navigate(`/viewassettypes`)
                            }).catch((error) => {
                                sessionStorage.setItem('reserr',error.data.statusMsg)
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
                                <fieldset >
                                    <label htmlFor="type_name">Asset Type</label>
                                    <Field className="form-control" id="type_name" placeholder="Enter Asset Type" name="type_name"></Field>
                                    <ErrorMessage component="div" name="type_name" className="alert alert-warning"/>
                                </fieldset>
                                <div>
                                    <Button type="submit" variant="contained" color="primary" className="m-1" >{btnValue}</Button>
                                    {/* <button type="submit" className="btn btn-success m-3" >{btnValue}</button> */}
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}