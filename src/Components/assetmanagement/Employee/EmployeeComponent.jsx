import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormikContext,
} from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveAllCompanies } from "../api/CompanyApiService";
import {
  getAllDepartments,
  getDepartmentByCompanyId,
} from "../api/DepartmentApiService";
import { Button } from "@mui/material";
import { getAllDesignations } from "../api/DesignationApiService";
import { getAllAssets } from "../api/AssetApiService";
import { getAssignedAssetsByEmployeeId, getEmployeeById, saveEmployee, updateEmployee } from "../api/EmployeeApiService";
import Select from "react-select";

function AssetMultiSelect({ options }) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <Select
      name="asset_ids"
      isMulti
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(selectedOptions) => {
        const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        setFieldValue("asset_ids", ids);
      }}
      value={options.filter((opt) => values.asset_ids?.includes(opt.value))}
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
  const [empEmail,setEmpEmail] = useState('')
  const [empContact,setEmpContact] = useState('')

  const [assignedAssets, setAssignedAssets] = useState("");
  const [company, setCompany] = useState(null);
  const [designation, setSelectedDesignation] = useState(null);
  const [isAssigned, setIsAssigned] = useState(false);
  const [department, setSelectedDepartment] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate()

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
      getEmployeeById(id).then((response)=>{
         setEmpName(response.data.emp_name)
         setEmpEmail(response.data.emp_email)
         setEmpContact(response.data.emp_contact)

      })

      getAssignedAssetsByEmployeeId(id).then((response) => {
        const assignedAssetsData = response.data;

        if (assignedAssetsData.length > 0) {
          setEmpName(assignedAssetsData[0].employee.emp_name);
          setEmpContact(assignedAssetsData[0].employee.emp_contact)
          setEmpEmail(assignedAssetsData[0].employee.emp_email)
          setSelectedDesignation(assignedAssetsData[0].employee.designation);
          setSelectedDepartment(assignedAssetsData[0].employee.department);
          setCompany(assignedAssetsData[0].employee.department.company);

          getAllDepartments().then((resp) => {
            setDeptList(resp.data);
          });

          const assignedNames = assignedAssetsData
            .map((a) => a.asset.asset_name+'('+a.asset.model_number+')')
            .join(", ");
          setAssignedAssets(assignedNames);
        }
      }).catch((error)=>{
         
      }) 
      ;
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

  function onSubmit(values)
  {
    let designation = {desig_id : values.designation , desig_name : ''} 
    let department = {dept_id : values.department , dept_name : ''}
    values.department = department
    values.designation = designation
    
    let employee = {
      emp_id : id,
      emp_name : values.emp_name,
      emp_email : values.emp_email,
      emp_contact : values.emp_contact,
      department : department,
      designation : designation,
      asset_ids : values.asset_ids
    }

    // values.emp_id = id
    console.log("emp Object is ",values)
    if(id== -1)
    {
      saveEmployee(employee).then((response)=>{
        sessionStorage.setItem('response','Employee '+employee.emp_name+' is saved successfully')
        navigate('/viewemployees')
      }).catch((error)=>{
        sessionStorage.setItem('reserr','Employee '+employee.emp_name+' is not saved ')
        navigate('/viewemployees')
      })
    }
    else {
     
      updateEmployee(employee).then((response)=>{
        sessionStorage.setItem('response','Employee '+employee.emp_name+' is saved successfully')
        navigate('/viewemployees')
      }).catch((error)=>{
        sessionStorage.setItem('reserr','Employee '+employee.emp_name+' is not saved ')
        navigate('/viewemployees')
      })
    }
  }

  const options = assetList
    .filter((asset_ids) => asset_ids.quantity > 0)
    .map((asset_ids) => ({
      value: asset_ids.asset_id,
      label: `${asset_ids.asset_name} - ${asset_ids.model_number} (${asset_ids.atype.type_name}) `,
    }));

  return (
    <div className="container">
      <h1>{btnValue}</h1>
      <Formik
        enableReinitialize
        initialValues={{
          emp_name: empName,
          emp_email:empEmail,
          emp_contact:empContact,
          assigned_assets: assignedAssets,
          company: company?.comp_id?.toString() || "",
          department: department?.dept_id?.toString() || "",
          designation: designation?.desig_id?.toString() || "",
          asset_ids: [],
        }}
        onSubmit={ onSubmit}
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
              <label htmlFor="emp_email">Employee Email</label>
              <Field
                type="text"
                placeholder="Enter Employee Email"
                name="emp_email"
                className="form-control"
                value={values.emp_email}
              />
              <ErrorMessage
                component="div"
                name="emp_email"
                className="alert alert-warning"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="emp_contact">Employee Contact</label>
              <Field
                type="text"
                placeholder="Enter Employee Contact"
                name="emp_contact"
                className="form-control"
                value={values.emp_contact}
              />
              <ErrorMessage
                component="div"
                name="emp_contact"
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
