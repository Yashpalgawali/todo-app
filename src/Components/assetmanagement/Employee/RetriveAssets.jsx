import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAssignedAssetsByEmployeeId } from "../api/EmployeeApiService"

export default function RetriveAssets() {

    const [employee,setEmployee] = useState({
        emp_name : '',
        assigned_assets : ''
    })

    const {id} = useParams()
    useEffect(
        () => {
              getAssignedAssetsByEmployeeId(id).then((response)=>{
                let data = response.data
                console.log(data)
              })

        }, [id]
    )

    function onSubmit(values) {
        console.log(values)
    }

    return(
        <div className="container">
            <h2 className="text-center">Retrieve All Assets</h2>
            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { employee } }
                    onSubmit={onSubmit}
                    validateOnBlur={true}
                    validateOnChange={true}
                >
                {
                    (props) =>(
                        <Form>
                            <fieldset>
                                <label htmlFor="emp_name">Employee</label>
                                <Field type="text" name="emp_name" className="form-control"   />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="assigned_assets">Assigned Assets</label>
                                <Field as="select" name="assigned_assets" className="form-control">
                                    
                                </Field>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="comments">Comments</label>
                                <Field as="textarea" rows="5" className="form-control">

                                </Field>
                            </fieldset>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}