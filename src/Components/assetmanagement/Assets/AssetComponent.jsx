import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAssetById, saveAsset, updateAsset } from "../api/AssetApiService"
import { getAllAssetTypes, getAssetTypeById } from "../api/AssetTypeApiService"

export default function AssetComponent() {

    const {id} = useParams()
    const [btnValue,setBtnValue] = useState('Add Asset')
    const [asset_name,setAssetName]  = useState('')
    const [asset_number,setAssetNumber]  = useState('')
    const [model_number,setModelNumber]  = useState('')
    const [quantity,setQuantity]  = useState('')
    const [assettypes,setAssetTypes] = useState([])
    const [atype ,setAssetType] = useState({type_id:'',type_name:''})

    const navigate = useNavigate()

    useEffect(
        ()=> retrieveAssetById() ,[id]
    )

    function retrieveAssetById() {

        getAllAssetTypes().then((response)=> setAssetTypes(response.data))

        if(id != -1) {
            setBtnValue('Update Asset')
            getAssetById(id).then((response) => {
                setAssetName(response.data.asset_name)
                setAssetNumber(response.data.asset_number)
                setModelNumber(response.data.model_number)
                setQuantity(response.data.quantity)                 
            })
            .catch((error) => {
                sessionStorage.setItem('reserr' , error.response.data.errorMessage)
                navigate(`/viewassets`)
            })
        }
    }

    function validate(values) {
        let errors={}
       
        if(values.asset_name.length < 5 ) {
            errors.asset_name='Please provide some name '
        }

        if(values.asset_number.length < 5 ) {
            errors.asset_number='Please provide Asset number at least 5 characters '
        }

        if(values.model_number.length < 5 ) {
            errors.model_number='Please provide Model number at least 5 characters'
        }

        if(values.quantity=='' && values.quantity==null){
            errors.quantity='Please Provide some Quantity'
        }

        return errors
    }

    function onSubmit(values) {

        getAssetTypeById(values.assettypes).then((response)=> {
            const atypeObj = {
                type_id : response.data.type_id,
                type_name : response.data.type_name
            }
              
            const asset = {asset_id : id,
                asset_name : values.asset_name, asset_number: values.asset_number, 
                model_number : values.model_number,quantity : values.quantity,
                atype : atypeObj
            }
         if(id == -1) {
                saveAsset(asset).then((response) => {            
                sessionStorage.setItem('response',response.data.statusMsg)
                navigate(`/viewassets`)
            })
        } 
        else {
            updateAsset(asset).then((response) => {
                sessionStorage.setItem('response',response.data.statusMsg)
                navigate(`/viewassets`)
            }).catch((error) => {
                sessionStorage.setItem('reserr',error.data.statusMsg)
                navigate(`/viewassets`)
            })
          }
        })
    }

    return(
        <div className="container"> 
            <h1 className="text-center">{btnValue}</h1>
        <div>
            <Formik initialValues={ { asset_name,asset_number,model_number,quantity,assettypes:''} }
                enableReinitialize={true}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
            {
                (props) => (
                    <Form>
                        <fieldset className="form-group">
                            <label>Asset Type</label>
                            <Field className="form-control" name="assettypes" as="select"  >
                                <option> Please Select Asset Type</option>
                                {
                                 assettypes.map(
                                    (atype) =>(
                                        <option key={atype.type_id} value={atype.type_id}>{atype.type_name}</option>
                                    )
                                 )   
                                }
                            </Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="atype"/>
                        </fieldset>
                        <fieldset>
                            <label>Asset Name</label>
                            <Field className="form-control" name="asset_name"  type="text" placeholder="Please Enter Asset name" ></Field>
                            <ErrorMessage  component="div" className="alert alert-warning"  name="asset_name"/>
                        </fieldset>
                        <fieldset>
                            <label>Asset Number</label>
                            <Field className="form-control" name="asset_number" type="text" placeholder="Please Enter Asset Number"></Field>
                            <ErrorMessage  component="div" className="alert alert-warning"  name="asset_number"/>
                        </fieldset>
                        <fieldset>
                            <label>Model Number</label>
                            <Field className="form-control" name="model_number" type="text" placeholder="Please Enter Model Number"></Field>
                            <ErrorMessage  component="div" className="alert alert-warning"  name="model_number"/>
                        </fieldset>

                        <fieldset>
                            <label>Quantity</label>
                            <Field className="form-control" name="quantity" type="number"></Field>
                            <ErrorMessage  component="div" className="alert alert-warning" name="quantity"/>
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