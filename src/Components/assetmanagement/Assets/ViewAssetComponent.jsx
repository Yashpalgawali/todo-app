import { useEffect, useState } from "react"
import { getAllAssets } from "../api/AssetApiService"
import { useNavigate } from "react-router-dom"

export default function ViewAssetComponent() {

    const [assetlist,setAssetList] = useState([])

    const navigate = useNavigate()
    useEffect(()=> retrieveAllAssets(), [])
    
    function retrieveAllAssets() {
        getAllAssets().then( (response) => setAssetList(response.data) )
    }

    function addNewAsset()
    {
        navigate(`/asset/-1`)
    }

    function updateAsset(id){
        navigate(`/asset/${id}`)
    }

    return(
        <div className="container">
            <h1 className="text-center">View Assets <button type="submit" className="tbn btn-primary" onClick={addNewAsset}>Add Asset</button> </h1>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Asset Name</th>
                        <th>Asset Number</th>
                        <th>Model Number</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assetlist.map(
                            (asset) => (
                                <tr key={asset.asset_id}>
                                    <td>{asset.asset_id}</td>
                                    <td>{asset.asset_name}</td>
                                    <td>{asset.asset_number}</td>
                                    <td>{asset.model_number}</td>
                                    <td>{asset.quantity}</td>
                                    <td> <button type="submit" className="btn btn-success" onClick={()=>updateAsset(asset.asset_id)}>UPDATE</button></td>
                                </tr>
                            )
                        )
                       
                    }
                </tbody>
            </table>
        </div>
    )
}