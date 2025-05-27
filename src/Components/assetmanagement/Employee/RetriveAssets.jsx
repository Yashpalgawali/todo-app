import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAssignedAssetsByEmployeeId } from "../api/EmployeeApiService"
import { Button } from "@mui/material"

export default function RetriveAssets() {

    const [employee,setEmployee] = useState({
        emp_name : '',
        assigned_assets : ''
    })

    const [assigned_assets,setAssignedAssets] = useState('')

    const {id} = useParams()
    useEffect(
        () => {
              getAssignedAssetsByEmployeeId(id).then((response)=>{
                let data = response.data
                console.log(data)
                let assets = ''
                for(let i=0;i<data.length;i++) {
                    if(i==0) {
                        assets += data[i].asset.asset_name +', '
                    }
                    else {
                        if(i == (data.length-1))
                         {
                            assets += data[i].asset.asset_name+' ( '+data[i].asset.atype.type_name+' )'
                         }
                         else { 
                            assets += data[i].asset.asset_name+' ( '+data[i].asset.atype.type_name+' )'+', '
                         }
                    }                     
                }
                setAssignedAssets(assets)
                setEmployee({
                    emp_name : response.data[0].employee.emp_name
                })
                console.log(data)
              })

        }, [id]
    )

    function onSubmit(values) {
        const emp = {
            emp_id : id,
            emp_name : employee.emp_name,
        }
    }

    return(
        <div className="container">
            <h2 className="text-center">Retrieve All Assets</h2>
            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { employee ,assigned_assets} }
                    onSubmit={onSubmit}
                    validateOnBlur={true}
                    validateOnChange={true}
                >
                {
                    (props) =>(
                        <Form>
                            <fieldset>
                                <label htmlFor="emp_name">Employee</label>
                                <Field type="text" readOnly disabled name="employee.emp_name" className="form-control"   />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="assigned_assets">Assigned Assets</label>
                                <Field type='text' readOnly disabled name="assigned_assets" className="form-control">
                                    
                                </Field>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="comments">Comments</label>
                                <Field as="textarea" name='comments' rows="5" className="form-control">

                                </Field>
                            </fieldset>
                            <Button type="submit" variant="contained" color="primary" className="mt-3">Retrieve Assets</Button>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}