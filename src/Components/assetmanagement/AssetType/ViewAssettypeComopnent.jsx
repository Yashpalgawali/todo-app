import { useEffect, useRef, useState } from "react"
import { getAllAssetTypes } from "../api/AssetTypeApiService"
import { useNavigate } from "react-router-dom"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import $ from 'jquery'; // jQuery is required for DataTables to work

import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import { Button } from "@mui/material"


export default function ViewAssettypeComponent() {

    const [assettypelist,setAssetTypeList] = useState([])
    const [successMessage , setSuccessMessage] = useState('')
    const [errorMessage , setErrorMessage] = useState('')

    const tableRef = useRef(null); // Ref for the table

    const navigate = useNavigate()

    useEffect(()=> refreshAssetTypes() , [] )
    
    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && assettypelist.length >0 ) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [assettypelist]); // Re-initialize DataTables when activities data changes

    function refreshAssetTypes() {
        if(sessionStorage.getItem('response')!=''){
            setSuccessMessage(sessionStorage.getItem('response'))
             setTimeout(() => {
                sessionStorage.removeItem('response')
                setSuccessMessage('')
             }, 2000);
        }

        if(sessionStorage.getItem('reserr')!=''){
            setErrorMessage(sessionStorage.getItem('reserr'))
             setTimeout(() => {
                sessionStorage.removeItem('reserr')
                setErrorMessage('')
             }, 2000);
        }
        getAllAssetTypes().then((response) => {           
            setAssetTypeList(response.data)
        })
    }  

    function addNewAssettype() {
        navigate(`/assettype/-1`)
    }

    function updateAssettype(id) {
        navigate(`/assettype/${id}`)
    }

    return(
        <div className="container">
            <h2 className="text-center m-4">View Asset Types 
                {/* <button type="submit" style={ { float: 'right !important' } } className="btn btn-primary" onClick={addNewCompany} ><strong>Add Company</strong></button>  */}
                <Button type="submit" variant="contained" color="primary" style={ { float: 'right !important' } } className="m-2" onClick={addNewAssettype} >Add Asset type</Button>    
            </h2>
            {successMessage && <div className="text-center alert alert-success"><strong> {successMessage}</strong> </div> }
            {errorMessage && <div className="text-center alert alert-warning"> <strong>{errorMessage} </strong></div> }
      
            <table ref={tableRef} className="table table-striped table-hover display">
                <thead>
                    <tr >
                        <th>Sr No.</th>
                        <th>Asset type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {assettypelist.length === 0 ? (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                No data available
                            </td>
                        </tr>
                        ) : (
                        assettypelist.map((assettype,index) => (
                            <tr key={assettype.type_id}>
                            <td>{index+1}</td>
                            <td>{assettype.type_name}</td>
                            <td>
                                <Button type="submit" variant="contained" color="primary" onClick={() => updateAssettype(assettype.type_id)} > <EditSquareIcon  />Update</Button>
                                {/* <button className="btn btn-link" onClick={() => updateCompany(comp.comp_id)} >
                               UPDATE
                                </button> */}
                            </td>
                            </tr>
                        ))
                        )}
                </tbody>
            </table>
        </div>
    )
}