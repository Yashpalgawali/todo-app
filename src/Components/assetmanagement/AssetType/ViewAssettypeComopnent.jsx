import { useEffect, useRef, useState } from "react"
import { getAllAssetTypes } from "../api/AssetTypeApiService"
import { useNavigate } from "react-router-dom"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

export default function ViewAssettypeComponent() {

    const [assettypes ,setAssettypes] = useState([])
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const tableRef = useRef(null); // Ref for the table

    useEffect(()=> retrieveAllAssetTypes , [])
    
    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && assettypes.length > 0) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [assettypes]); // Re-initialize DataTables when activities data changes
    

    function retrieveAllAssetTypes() {
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
           
            setAssettypes(response.data)
        })
    }

    function updateAssetType(id) {
        navigate(`/assettype/${id}`)
    }
    function addNewAssettype() {
        navigate(`/assettype/-1`)
    }
    

    return(
        <div className="container">
            <h2 className="text-center">View Asset Types <button type="submit" className="btn btn-primary" onClick={addNewAssettype}>Add Asset Type</button> </h2>
            { successMessage &&  <div className="alert alert-success">{successMessage}</div> }
            { errorMessage &&  <div className="alert alert-danger">{errorMessage}</div> }
            <table className="table table-striped table-hover" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Asset Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assettypes.map(
                            (assettype)=> (
                                <tr key={assettype.type_id}>
                                    <td>{assettype.type_id}</td>
                                    <td>{assettype.type_name}</td>
                                    <td><button type="submit" className="btn btn-success" onClick={()=> updateAssetType(assettype.type_id)} ><EditSquareIcon />  UPDATE</button> </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}