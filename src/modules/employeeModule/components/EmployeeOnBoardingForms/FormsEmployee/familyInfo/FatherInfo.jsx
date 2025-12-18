import React from "react";
import { Formik } from "formik";
 
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import FormCheckbox from "widgets/Checkbox/Checkbox";
 
import styles from "./FatherInfo.module.css";
 
const FatherInfo = ({ showEmployeeId }) => {
  const initialValues = {
    name: "",
    bloodGroup: "",
    nationality: "",
    late: false,
    occupation: "",
    email: "",
    phoneNumber: "",
      aadharNum: "",
        DateOfBirth: "",
    employeeId: "",
  };
 
  return (
    <div className={styles.container}>
      <Formik initialValues={initialValues}>
        {({ values, handleChange, setFieldValue }) => (
          <div className={styles.formGrid}>
 
            {/* Row 1 */}
            <div className={styles.row}>
              <div className={styles.nameField}>
 
                <Inputbox
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={values.name}
                  onChange={handleChange}
                />
 
                <div className={styles.checkboxRow}>
                  <span className={styles.checkboxText}>Late</span>
 
                  <FormCheckbox
                    id="father-late"
                    name="Father-late"
                    checked={values.late}
                    onChange={(checked) => setFieldValue("late", checked)}
                  />
                </div>
              </div>
 
              <Dropdown
                dropdownname="Blood Group"
                name="bloodGroup"
                results={["A+","A-","B+","B-","O+","O-","AB+","AB-"]}
                value={values.bloodGroup}
                onChange={handleChange}
              />
 
              <Dropdown
                dropdownname="Nationality"
                name="nationality"
                results={["Indian","American","Canadian","Other"]}
                value={values.nationality}
                onChange={handleChange}
              />
            </div>
 
            {/* Row 2 */}
            <div className={styles.row}>
              <Inputbox
                label="Occupation"
                name="occupation"
                placeholder="Enter Occupation"
                value={values.occupation}
                onChange={handleChange}
              />
 
              <Inputbox
                label="Email"
                name="email"
                placeholder="Enter email id"
                value={values.email}
                onChange={handleChange}
              />
 
              <Inputbox
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={values.phoneNumber}
                onChange={handleChange}
              />
            </div>
 
            {/* Row 3 — Employee ID if in Organization */}
            {showEmployeeId && (
              <div className={styles.row}>
                <Inputbox
                  label="Employee ID"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  value={values.employeeId}
                  onChange={handleChange}
                />
              </div>
            )}
 
          </div>
        )}
      </Formik>
    </div>
  );
};
 
export default FatherInfo;
 
 