import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCovCenWardById, saveCovCenWard, updateCovCenWard } from "../api/CovCenWardApiService"
import { getAllCovCenWardTypes } from "../api/CovCenWardTypeApiService";
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function CovCenWardComponent() {

    const [btnValue ,setBtnValue ] = useState('Add CovCenter Ward ')
    const [covcenward_num,setCovCenterWardNum ] = useState('')
    const [covcenward_id,setCovcenWardId] = useState('')

    const [covcenwardtypelist,setCovCenWardTypeList] = useState([])

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(
        () => retrieveCovCenterWardById, [id]
    )

    function retrieveCovCenterWardById () {
        getAllCovCenWardTypes().then((response) => {
            console.log((response.data))
            setCovCenWardTypeList(response.data)
        })

        if(id != -1) {
            setBtnValue('Update CovCen Ward')
            getCovCenWardById(id).then((response)=>{
                setCovCenterWardNum(response.data.covcenward_num)
                setCovcenWardId(response.data.covcenward_id)

            }).catch((error)=>{
                sessionStorage.setItem('reserr',error.response.data.errorMessage)
                navigate('/covcenwards')
            })
        }
    }

    function validate(values) {
        let errors ={}

        if(values.covcenward_num.length<3) {
            errors.covcenward_num='Please Enter at lease 3 characters'
        }
    }

    function onSubmit(values) {

        let wardObj = {
            covcenward_id : id,
            covcenward_num : values.covcenward_num
        }
        console.log(wardObj)
        // if(id == -1) {
        //     saveCovCenWard(wardObj).then((response)=> {
        //         sessionStorage.setItem('response',values.covcenward_num+' is saved successfully')
        //         navigate(`/covcenwards`)
        //     }).catch((error)=>{
        //         sessionStorage.setItem('reserr',values.covcenward_num+' is not saved')
        //         navigate(`/covcenwards`)
        //     })
        // }
        // else {
        //     updateCovCenWard(wardObj).then((response)=> {
        //         sessionStorage.setItem('response',values.covcenward_num+' is updated successfully')
        //         navigate(`/covcenwards`)
        //     }).catch((error)=>{
        //         sessionStorage.setItem('reserr',values.covcenward_num+' is not updated')
        //         navigate(`/covcenwards`)
        //     })
        // }
    }

    return(
        <div className="container">
            <h1 className="text-center">{btnValue}</h1>

            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { covcenward_num, covcenward_id} }
                    validate={validate}
                    onSubmit={onSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                 {
                    (props) =>(
                        <Form>
                            <fieldset>
                                <label htmlFor="covcenward_num">Ward Type.</label>
                                <Field as="select" className="form-control" name="covcenwardtypelist" >
                                    <option>Please select Ward Type</option>
                                    {
                                        covcenwardtypelist.map(
                                            (type) => (
                                                <option key={type.covcenwardtype_id} value={type}>{type.covcenward_type}</option>
                                            )
                                        )
                                    }
                                </Field>
                                <ErrorMessage name="covcenward_num" component="div" className="alert alert-warning" />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="covcenward_num">Ward No.</label>
                                <Field type="text" className="form-control" name="covcenward_num" ></Field>
                                <ErrorMessage name="covcenward_num" component="div" className="alert alert-warning" />
                            </fieldset>
                            <div>
                                <button type="submit" className="btn btn-success m-3">{btnValue}</button>
                            </div>
                        </Form>
                    )
                 }
                </Formik>
            </div>
        </div>
    )
}