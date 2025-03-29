import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAssetById } from "../api/AssetApiService"

export default function AssetComponent() {

    const {id} = useParams()
    const [btnValue,setBtnValue] = useState('Add Asset')
    const [asset_name,setAssetName]  = useState('')
    const [asset_number,setAssetNumber]  = useState('')
    const [model_number,setModelNumbe]  = useState('')
    const [quantity,setQuantity]  = useState('')
    useEffect(
        ()=> retrieveAssetById() ,[id]
    )

    function retrieveAssetById() {
        if(id != -1) {
            setBtnValue('Update Asset')
            getAssetById(id).then((response) => {
                setAssetName(response.data.asset_name)
                setAssetNumber(response.data.asset_number)
                setAssetNumber(response.data.asset_number)
            })
        }

    }


    function validate(values) {

    }
    function onSubmit(values) {

    }

    return(
        <div className="container"> 
            <h1 className="text-center">{btnValue}</h1>
        <div>
            <Formik initialValues={ { asset_name,asset_number,model_number,quantity} }
                enableReinitialize={true}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
            {
                (props) => (
                    <Form>
                        <fieldset>
                            <label>Asset Name</label>
                            <Field className="form-control" name="asset_name" ></Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="asset_name"/>
                        </fieldset>
                        <fieldset>
                            <label>Asset Number</label>
                            <Field className="form-control" name="asset_number" ></Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="asset_number"/>
                        </fieldset>
                        <fieldset>
                            <label>Model Number</label>
                            <Field className="form-control" name="model_number" ></Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="model_number"/>
                        </fieldset>

                        <fieldset>
                            <label>Quantity</label>
                            <Field className="form-control" name="quantity" ></Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="quantity"/>
                        </fieldset>
                    </Form>
                )
            }

            </Formik>
        </div>

        </div>
    )
}