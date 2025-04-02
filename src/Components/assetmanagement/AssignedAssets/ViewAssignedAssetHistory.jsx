import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewAssetAssignHistoryByEmployeeId } from "../api/EmployeeApiService";
import { error } from "jquery";

export default function ViewAssignedAssetHistory() {
    const [assethistory,setAssetAssignHistory] = useState([])
    const [emp_name,setEmpName] = useState('')
    const [company,setCompany] = useState('')
    const [designation,setDesignation] = useState('')

    const {id} = useParams()
    useEffect(
        () => retrieveAssetAssignHistoryByEmpId() , [id]
    )

    function retrieveAssetAssignHistoryByEmpId() {
        viewAssetAssignHistoryByEmployeeId(id).then((response) => {
           
            setAssetAssignHistory(response.data)
            setEmpName(response.data[0].employee.emp_name)
            setDesignation(response.data[0].employee.designation.desig_name)
            setCompany(response.data[0].employee.department.company.comp_name)
        })
        
    }

    return(
        <div className="container">
            <h1>View Asset Assign History</h1>
            <div className="form-group">
							
                <span><label><strong>Employee Name: </strong></label>&nbsp;{emp_name}</span> <span style={{float: "right"}}><label><strong>Designation: </strong></label>&nbsp;{designation}</span>
                <br />
                <span><label><strong>Company: </strong>&nbsp;</label>{company}</span>
                
            </div>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Asset </th>
                        <th>Operation</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assethistory.map(
                            (asset) => (
                                <tr key={asset.hist_id}>
                                    <td>{asset.hist_id}</td>
                                    <td>{asset.asset.asset_name}</td>
                                    <td>{asset.operation}</td>
                                    <td>{asset.operation_date}</td>
                                    <td>{asset.operation_time}</td>
                                </tr>
                            )
                        )
                    }
                    
                </tbody>
            </table>
        </div>
    )
}