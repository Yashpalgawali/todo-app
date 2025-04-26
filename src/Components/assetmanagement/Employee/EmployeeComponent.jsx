import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { retrieveAllCompanies } from "../api/CompanyApiService"
import { getDepartmentByCompanyId } from "../api/DepartmentApiService"
import { Button } from '@mui/material';
import { getAllDesignations } from "../api/DesignationApiService"
import { getAllAssets } from "../api/AssetApiService"
import { getAssignedAssetsByEmployeeId } from "../api/EmployeeApiService"

export default function EmployeeComponent() {
    const [btnValue,setBtnValue] = useState('Add Employee')

    const [deptlist,setDeptList] = useState([])
    const [compList,setCompList] = useState([])
    const [desigList,setDesigList] = useState([])
    const [assetList,setAssetList] = useState([])
    const [emp_name,setEmpName] = useState('')
    const [assigned_assets,setAssignedAssets] = useState('')
    const [company,setSelectedCompany] = useState(null)

    const {id} = useParams()

    useEffect(
        ()=>   retrieveEmployeeById ,[] 
    )
 
    function retrieveEmployeeById() {
        retrieveAllCompanies().then((response) => {
            setCompList(response.data)
        })
        getAllDesignations().then((response)=> {
            setDesigList(response.data)
        })
        getAllAssets().then((response)=> {
            setAssetList(response.data)
        })
        if(id != -1) {
            setBtnValue('Update Employee')
            getAssignedAssetsByEmployeeId(id).then((response)=>{
               let assignedAssets = response.data
               console.log(assignedAssets)
               setSelectedCompany(response.data[0].employee.department.company)
               const joinname= assignedAssets
                    .map(asset=> asset.asset.asset_name)
                    .join(',')
                    setAssignedAssets(joinname)
            })
        }
        else {

        }
    }

    
    function handleCompanyChange(event){
        let comp = event.target.value
         console.log(comp)
        // getDepartmentByCompanyId(event.target.value).then((response) => {
        //         setDeptList(response.data)
        //     }) 
    }
    return(
        <div className="container">
            <h1>{btnValue}</h1>
            <div>
                <Formik
                    enableReinitialize={true}
                    initialValues={ { emp_name , assigned_assets, company: company?.comp_id?.toString() || '' } }
                >
                    {
                        (props) =>(
                            <Form>
                                <fieldset>
                                    <label>Employee Name</label>
                                    <Field type="text" placeholder="Enter Employee name" style={ { height : '60px', backgroundColor : '#e8e8e8' } } name="emp_name" className="form-control"></Field>
                                    <ErrorMessage component="div" name="emp_name" className="alert alert-warning"/>
                                </fieldset>
                               
                                <fieldset>
                                    <label htmlFor="company">Company</label> 
                                    <Field as="select" className="form-control" name="company" onChange={handleCompanyChange}>
                                        <option>Please Select Company</option>
                                        {
                                            compList.map(
                                                (company) =>( 
                                                    <option value={company} key={company.comp_id}>{company.comp_name}</option>
                                                )
                                            )
                                        } 
                                    </Field>
                                </fieldset>

                                <fieldset>
                                    <label htmlFor="department">Department</label> 
                                    <Field as="select" className="form-control" name="department"  >
                                        <option>Please select Department</option>
                                        {
                                            deptlist.map(
                                                (dept) =>( 
                                                    <option value={dept.dept_id} key={dept.dept_id}>{dept.dept_name}</option>
                                                )
                                            )
                                        }
                                    </Field>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="designation">Designation</label> 
                                    <Field as="select" className="form-control" name="designation"  >
                                        <option>Please select Designation</option>
                                        {
                                            desigList.map(
                                                (desig) =>( 
                                                    <option value={desig.desig_id} key={desig.desig_id}>{desig.desig_name}</option>
                                                )
                                            )
                                        }
                                    </Field>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="assigned_assets">Assigned Assets</label>
                                    <Field type="text" readOnly disabled className="form-control" name="assigned_assets"/>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="asset">Assign Assets</label> 
                                    <Field as="select" className="form-control" name="asset" multiple >
                                        <option>Please select Asset</option>
                                        {
                                            assetList
                                            .filter(asset=> asset.quantity > 0)
                                            .map(
                                                (asset) => ( 
                                                        <option value={asset.asset_id} key={asset.asset_id}>{asset.asset_name}( {asset.atype.type_name})</option>
                                                )
                                            )
                                        }
                                    </Field>
                                </fieldset>
                                <Button type="submit" variant="contained" color="primary" className="m-3">Submit</Button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}