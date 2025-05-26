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
import { getAssignedAssetsByEmployeeId, saveEmployee } from "../api/EmployeeApiService";
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
    .filter((asset_ids) => asset_ids.quantity > 0)
    .map((asset_ids) => ({
      value: asset_ids.asset_id,
      label: `${asset_ids.asset_name} (${asset_ids.atype.type_name})`,
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
