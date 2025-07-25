import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { viewAssetAssignHistoryByEmployeeId } from "../api/EmployeeApiService";
import { exportAssignAssetsByEmpId } from "../api/AssetAssignHistory";

import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { Button, Tooltip } from "@mui/material";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

 
 
export default function ViewAssignedAssetHistory() {
    const [assethistory,setAssetAssignHistory] = useState([])
    const [emp_name,setEmpName] = useState('')
    const [company,setCompany] = useState('')
    const [designation,setDesignation] = useState('')

    const tableRef= useRef(null)

    const {id} = useParams()

    useEffect(
        () => {
            if(tableRef.current && assethistory.length>0) {
                $(tableRef.current).DataTable()
            }
        } ,[assethistory]
    ) 

    useEffect(
        () => retrieveAssetAssignHistoryByEmpId , []
    )

    function downloadAssetAssignHistory() { 
               exportAssignAssetsByEmpId(id).then((response)=>{
                 // Convert the array buffer to a Blob
                 const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
   
                 // Create a link element to trigger download
                 const link = document.createElement('a');
                 link.href = URL.createObjectURL(blob);
                 link.download = 'Assets Assign History - '+emp_name+'.xlsx';
                 link.click();
           })
       }
    
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
            <h2>View Asset Assign History</h2>
            <div className="form-group">
				<div className="mb-1">
                    <span  style={ { float : 'left'}}><label><strong>Employee : </strong></label>&nbsp;{emp_name}</span> <span style={{float: "right"}}><label><strong>Designation: </strong></label>&nbsp;{designation}</span>
                </div>
                <div>
                    <span style={ { float : 'left',clear : 'right'}}><label><strong>Company : </strong>&nbsp;</label>{company}</span> <span style={{float: "right"}}><Button variant="contained" color="success" id="downloadBtn" onClick={downloadAssetAssignHistory} > <Tooltip title="Download Asset Assign History" placement="left" enterDelay={10} leaveDelay={600}  arrow>  <DownloadForOfflineIcon /> &nbsp;Donwload</Tooltip></Button> </span>
                </div>
            </div>
            <table className="table table-hover table-striped" ref={tableRef}>
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
                            (asset,index) => (
                                <tr key={asset.hist_id}>
                                    <td>{index+1}</td>
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