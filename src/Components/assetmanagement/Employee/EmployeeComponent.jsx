
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormikContext,
} from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveAllCompanies } from "../api/CompanyApiService";
import {
  getAllDepartments,
  getDepartmentByCompanyId,
} from "../api/DepartmentApiService";
import { Button } from "@mui/material";
import { getAllDesignations } from "../api/DesignationApiService";
import { getAllAssets } from "../api/AssetApiService";
import { getAssignedAssetsByEmployeeId } from "../api/EmployeeApiService";
import Select from "react-select";

function AssetMultiSelect({ options }) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <Select
      name="asset"
      isMulti
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(selectedOptions) => {
        const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        setFieldValue("asset", ids);
      }}
      value={options.filter((opt) => values.asset?.includes(opt.value))}
    />
  );
}

export default function EmployeeComponent() {
  const [btnValue, setBtnValue] = useState("Add Employee");

  const [deptlist, setDeptList] = useState([]);
  const [compList, setCompList] = useState([]);
  const [desigList, setDesigList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [empName, setEmpName] = useState("");
  const [assignedAssets, setAssignedAssets] = useState("");
  const [company, setCompany] = useState(null);
  const [designation, setSelectedDesignation] = useState(null);
  const [isAssigned, setIsAssigned] = useState(false);
  const [department, setSelectedDepartment] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    retrieveAllCompanies().then((response) => {
      setCompList(response.data);
    });
    getAllDesignations().then((response) => {
      setDesigList(response.data);
    });
    getAllAssets().then((response) => {
      setAssetList(response.data);
    });

    if (id !== "-1" && id !== -1) {
      setBtnValue("Update Employee");
      setIsAssigned(true);

      getAssignedAssetsByEmployeeId(id).then((response) => {
        const assignedAssetsData = response.data;

        if (assignedAssetsData.length > 0) {
          setEmpName(assignedAssetsData[0].employee.emp_name);
          setSelectedDesignation(assignedAssetsData[0].employee.designation);
          setSelectedDepartment(assignedAssetsData[0].employee.department);
          setCompany(assignedAssetsData[0].employee.department.company);

          getAllDepartments().then((resp) => {
            setDeptList(resp.data);
          });

          const assignedNames = assignedAssetsData
            .map((a) => a.asset.asset_name)
            .join(", ");
          setAssignedAssets(assignedNames);
        }
      });
    }
  }, [id]);

  const handleCompanyChange = async (event, setFieldValue) => {
    const compId = event.target.value;
    setFieldValue("company", compId);

    if (compId) {
      const response = await getDepartmentByCompanyId(compId);
      setDeptList(response.data);
      setFieldValue("department", ""); // Reset department selection on company change
    } else {
      setDeptList([]);
      setFieldValue("department", "");
    }
  };

  const options = assetList
    .filter((asset) => asset.quantity > 0)
    .map((asset) => ({
      value: asset.asset_id,
      label: `${asset.asset_name} (${asset.atype.type_name})`,
    }));

  return (
    <div className="container">
      <h1>{btnValue}</h1>
      <Formik
        enableReinitialize
        initialValues={{
          emp_name: empName,
          assigned_assets: assignedAssets,
          company: company?.comp_id?.toString() || "",
          department: department?.dept_id?.toString() || "",
          designation: designation?.desig_id?.toString() || "",
          asset_ids: [],
        }}
        onSubmit={(values) => {
          console.log("Submitted values:", values);
          // TODO: handle submit logic here
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <fieldset>
              <label htmlFor="emp_name">Employee Name</label>
              <Field
                type="text"
                placeholder="Enter Employee name"
                name="emp_name"
                className="form-control"
                value={values.emp_name}
              />
              <ErrorMessage
                component="div"
                name="emp_name"
                className="alert alert-warning"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="company">Company</label>
              <Field
                as="select"
                className="form-control"
                name="company"
                value={values.company}
                onChange={(e) => handleCompanyChange(e, setFieldValue)}
              >
                <option value="">Please Select Company</option>
                {compList.map((company) => (
                  <option
                    value={company.comp_id}
                    key={company.comp_id}
                  >
                    {company.comp_name}
                  </option>
                ))}
              </Field>
            </fieldset>

            <fieldset>
              <label htmlFor="department">Department</label>
              <Field
                as="select"
                className="form-control"
                name="department"
                value={values.department}
                onChange={(e) => setFieldValue("department", e.target.value)}
              >
                <option value="">Please Select Department</option>
                {deptlist.map((dept) => (
                  <option value={dept.dept_id} key={dept.dept_id}>
                    {dept.dept_name}
                  </option>
                ))}
              </Field>
            </fieldset>

            <fieldset>
              <label htmlFor="designation">Designation</label>
              <Field
                as="select"
                className="form-control"
                name="designation"
                value={values.designation}
                onChange={(e) => setFieldValue("designation", e.target.value)}
              >
                <option value="">Please select Designation</option>
                {desigList.map((desig) => (
                  <option value={desig.desig_id} key={desig.desig_id}>
                    {desig.desig_name}
                  </option>
                ))}
              </Field>
            </fieldset>

            {isAssigned && (
              <fieldset>
                <label htmlFor="assigned_assets">Assigned Assets</label>
                <Field
                  type="text"
                  readOnly
                  disabled
                  className="form-control"
                  name="assigned_assets"
                  value={values.assigned_assets}
                />
              </fieldset>
            )}

            <fieldset>
              <label htmlFor="asset_ids">Assign Assets</label>
              <AssetMultiSelect options={options} />
            </fieldset>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="m-3"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}



// import { ErrorMessage, Field, Form, Formik, useField, useFormikContext } from "formik"
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { retrieveAllCompanies } from "../api/CompanyApiService"
// import { getAllDepartments, getDepartmentByCompanyId } from "../api/DepartmentApiService"
// import { Button } from '@mui/material';
// import { getAllDesignations } from "../api/DesignationApiService"
// import { getAllAssets } from "../api/AssetApiService"
// import { getAssignedAssetsByEmployeeId } from "../api/EmployeeApiService"
// import Select from "react-select";


// export default function EmployeeComponent() {
//     const [btnValue,setBtnValue] = useState('Add Employee')

//     const [deptlist,setDeptList] = useState([])
//     const [compList,setCompList] = useState([])
//     const [desigList,setDesigList] = useState([])
//     const [assetList,setAssetList] = useState([])
//     const [emp_name,setEmpName] = useState('')
//     const [assigned_assets,setAssignedAssets] = useState('')
//     const [company,setCompany] = useState(null)
//     const [designation,setSelectedDesignation] = useState(null)
//     const [isAssigned,setIsAssigned] = useState(false)
//     const [department,setSelectedDepartment] = useState(null)
 
//     // const { setFieldValue } = useFormikContext();

//     const {id} = useParams()

//     const multiOptions = [
//         { value : "india" , label: "India"},
//         { value : "america" , label: "US"},
//         { value : "japan" , label: "Japan"}
//     ]

//     useEffect(
//         ()=>   retrieveEmployeeById ,[] 
//     )
 
//     function retrieveEmployeeById() {
//         retrieveAllCompanies().then((response) => {
//             setCompList(response.data)
//         })
//         getAllDesignations().then((response)=> {
//             setDesigList(response.data)
//         })
//         getAllAssets().then((response)=> {
//             setAssetList(response.data)
//         })
//         if(id != -1) {
//             setBtnValue('Update Employee')
//             setIsAssigned(true)
//             getAssignedAssetsByEmployeeId(id).then((response)=>{
//                     let assignedAssets = response.data

//                     setEmpName(response.data[0].employee.emp_name)
//                    // setSelectedCompany(response.data[0].employee.department.company)
//                     setSelectedDesignation(response.data[0].employee.designation
//                 )
               
//                getAllDepartments().then((response)=>{
//                     setDeptList(response.data)
//                })

//                setSelectedDepartment(response.data[0].employee.department)
              
//                const joinname= assignedAssets
//                     .map(asset=> asset.asset.asset_name)
//                     .join(',') 
//                     setAssignedAssets(joinname)
//             })            
//         }         
//     }
   
//     // function handleCompanyChange(event) {
       
//     //     const comp = event.target.value;
//     //  setFieldValue('company', comp);
//     //     getDepartmentByCompanyId(comp).then((response) => {
//     //             setDeptList(response.data)
//     //         })
//     // }
//     const handleCompanyChange = async (event, setFieldValue) => {
//     const compId = event.target.value;
//     setFieldValue("company", compId);

//     if (compId) {
//       const response = await getDepartmentByCompanyId(compId);
//       setDeptList(response.data);
//       setFieldValue("department", ""); // Reset department selection on company change
//     } else {
//       setDeptList([]);
//       setFieldValue("department", "");
//     }
//   };
    
//    const { setFieldValue, values } = useFormikContext();

//     const options = assetList
//         .filter(asset => asset.quantity > 0)
//         .map(asset => ({
//             value: asset.asset_id,
//             label: `${asset.asset_name} (${asset.atype.type_name})`,
//         }));
    
//     return(
//         <div className="container">
//             <h1>{btnValue}</h1>
//             <div>
//                 <Formik
//                     enableReinitialize={true}
//                     initialValues={ { emp_name , assigned_assets, company: company?.comp_id?.toString() || '',department ,asset:[]} }
//                 >
                    
//                     {
//                         ({ props , setFieldValue }) =>(
//                             <Form>
//                                 <fieldset>
//                                     <label htmlFor="emp_name">Employee Name</label>
//                                     <Field type="text" placeholder="Enter Employee name" name="emp_name" className="form-control"></Field>
//                                     <ErrorMessage component="div" name="emp_name" className="alert alert-warning"/>
//                                 </fieldset>
                               
//                                 <fieldset>
//                                     <label htmlFor="company">Company</label> 
//                                     <Field as="select" className="form-control" name="company" onChange={(e) => handleCompanyChange(e, setFieldValue)}>
//                                         <option>Please Select Company</option>
//                                         {
//                                             compList.map(
//                                                 (company) =>( 
//                                                     <option value={company.comp_id} key={company.comp_id}>{company.comp_name}</option>
//                                                 )
//                                             )
//                                         } 
//                                     </Field>
//                                 </fieldset>
//                                 <fieldset>
//                                     <label htmlFor="department">Department</label> 
//                                     <Field as="select" className="form-control" name="department"  >
//                                         <option>Please Select Department</option>
//                                         {
//                                             deptlist.map(
//                                                 (dept) =>( 
//                                                     <option value={dept.dept_id} key={dept.dept_id}>{dept.dept_name}</option>
//                                                 )
//                                             )
//                                         }
//                                     </Field>
//                                 </fieldset>
//                                 <fieldset>
//                                     <label htmlFor="designation">Designation</label> 
//                                     <Field as="select" className="form-control" name="designation"  >
//                                         <option>Please select Designation</option>
//                                         {
//                                             desigList.map(
//                                                 (desig) =>( 
//                                                     <option value={desig.desig_id} key={desig.desig_id}>{desig.desig_name}</option>
//                                                 )
//                                             )
//                                         }
//                                     </Field>
//                                 </fieldset>                                
//                                 {
//                                    isAssigned &&  
//                                     <fieldset>
//                                     <label htmlFor="assigned_assets">Assigned Assets</label>
//                                     <Field type="text" readOnly disabled className="form-control" name="assigned_assets"/>
//                                 </fieldset>
//                                 }
//                                 <fieldset>
//                                     <label htmlFor="asset">Assign Assets</label>
//                                     <AssetMultiSelect options={options} />
//                                     {/* <Field as="select" className="form-control" name="asset" multiple={true} >
//                                     <option>Please Select Asset</option>
//                                     {
//                                         assetList
//                                         .filter(asset=> asset.quantity > 0)
//                                         .map(
//                                             (asset) => ( 
//                                                     <option value={asset.asset_id} key={asset.asset_id}>{asset.asset_name}( {asset.atype.type_name})</option>
//                                             )
//                                         )
//                                     }
//                                     </Field> */}
//                                 </fieldset>
//                                 <Button type="submit" variant="contained" color="primary" className="m-3">Submit</Button>
//                             </Form>
//                         )
//                     }
                    
//                 </Formik>
                
//             </div>
//         </div>
//     )

// function AssetMultiSelect({ options }) {
//   const { setFieldValue, values } = useFormikContext();

//   return (
//     <Select
//       name="asset"
//       isMulti
//       options={options}
//       className="basic-multi-select"
//       classNamePrefix="select"
//       onChange={(selectedOptions) => {
//         const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
//         setFieldValue("asset", ids);
//       }}
//       value={options.filter((opt) => values.asset?.includes(opt.value))}
//     />
//   );
// }}
