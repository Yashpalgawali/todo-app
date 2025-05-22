import { useEffect, useRef, useState } from "react"
import { getAllAssets } from "../api/AssetApiService"
import { useNavigate } from "react-router-dom"
import EditSquareIcon from '@mui/icons-material/EditSquare';

import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import { Button } from "@mui/material";

export default function ViewAssetComponent(){

    const [assetlist,setAssetList] = useState([])
    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const tableRef = useRef(null); // Ref for the table
    const [thcount,setThCount] = useState('')

    const navigate = useNavigate()
    useEffect(()=> retrieveAllAssets(), [])
    
    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && assetlist.length > 0) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [assetlist]); // Re-initialize DataTables when activities data changes
    
    function retrieveAllAssets() {
        const thcount = document.querySelectorAll('#table  thead tr th').length
        setThCount(thcount)
        if(sessionStorage.getItem('response')!= null) {
            setSuccessMessage(sessionStorage.getItem('response'))
            setErrorMessage('')
            setTimeout(() => {
                setSuccessMessage('')
                sessionStorage.removeItem('response')
            }, 2000);
        }

        if(sessionStorage.getItem('reserr')!= null) {
            setErrorMessage(sessionStorage.getItem('reserr'))
            setSuccessMessage('')
            setTimeout(() => {
                setErrorMessage('')
                sessionStorage.removeItem('reserr')
            }, 2000);
        }
        getAllAssets().then( (response) =>  { setAssetList(response.data) })
    }

    function addNewAsset() {
        navigate(`/asset/-1`)
    }

    function updateAsset(id) {
        navigate(`/asset/${id}`)
    }

    return(
        <div className="container">
            <h2 className="text-center">View Assets 
                <Button variant="contained" color="primary" onClick={addNewAsset} style={ { marginLeft : '10px' } }>Add Asset</Button>               
            </h2>
            {successMessage && <div className="alert alert-success"> <strong>{successMessage}</strong></div>  }
            {errorMessage && <div className="alert alert-warning"> <strong> {errorMessage} </strong> </div>  }
            <table className="table table-hover table-striped" id="table" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Asset Name</th>
                        <th>Asset Type</th>
                        <th>Asset Number</th>
                        <th>Model Number</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assetlist.length ==0 ? (
                            <tr>
                                <td colSpan={thcount}> No Data Available</td>
                            </tr>
                        ):(
                        assetlist.map(
                            (asset,index) => (
                                <tr key={asset.asset_id}>
                                    <td>{index+1}</td>
                                    <td>{asset.asset_name}</td>
                                    <td>{asset.atype?.type_name}</td>
                                    <td>{asset.asset_number}</td>
                                    <td>{asset.model_number}</td>
                                    <td>{asset.quantity}</td>
                                    <td><button type="submit" className="btn btn-success" onClick={()=>updateAsset(asset.asset_id)}><EditSquareIcon /> UPDATE</button></td>
                                </tr>
                            )
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}