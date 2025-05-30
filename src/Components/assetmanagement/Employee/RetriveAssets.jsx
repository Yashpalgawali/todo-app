import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAssignedAssetsByEmployeeId, retrieveAllAssetsByEmpId } from "../api/EmployeeApiService"
import { Button } from "@mui/material"

export default function RetriveAssets() {

    const [employee,setEmployee] = useState({
        emp_name : '',
        assigned_assets : '',
        comments : '',
        emp_id : ''
    })

    const [assigned_assets,setAssignedAssets] = useState('')

    const {id} = useParams()

    useEffect(
        () => {
             
            getAssignedAssetsByEmployeeId(id).then((response)=>{
               
                let data = response.data
                
                let assets = ''
                var result_length = data.length

                if(result_length == 1){
                    assets += data[0].asset.asset_name
                     
                }
                else {
                    for(let i=0;i<result_length;i++) {
                        if(i==0) {
                            assets +=  data[i].asset.asset_name+','
                            
                        } else {
                            if(i == result_length-1) {
                                assets += data[i].asset.asset_name
                            }
                            else {
                                assets = assets + data[i].asset.asset_name +','
                            }                            
                        }                        
                   }
                }                
                 
                setAssignedAssets(assets)
                setEmployee({
                    emp_name : data[0].employee.emp_name
                })
                 
            }).catch((error)=>{
                sessionStorage.setItem('reserr','No Assets are assigned to the Employee')
                navigate('/viewemployees') 
            })             
        }, [id]
    )
    
    const navigate = useNavigate()

    function onSubmit(values) {

        const emp = {
            emp_id : id,
            comments : values.comments
        }
        console.log(emp)
        retrieveAllAssetsByEmpId(emp).then((response)=> {
            sessionStorage.setItem('response','All assets are retrived from '+employee.emp_name)
            navigate(`/viewassignedassets`)
        }).catch((error)=> {
            sessionStorage.setItem('reserr','Assets are NOT retrived from '+employee.emp_name)
            navigate(`/viewassignedassets`)
        })
    }

    return (
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