import React, { useState } from "react";
 
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import FormCheckbox from "widgets/Checkbox/Checkbox";
 
import styles from "./MotherInfo.module.css";
 
const MotherInfo = ({ showEmployeeId }) => {
  const [formData, setFormData] = useState({
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
  });
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
 
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
 
  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>
 
        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.nameField}>
 
            <Inputbox
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
            />
 
            <div className={styles.checkboxRow}>
              <span className={styles.checkboxText}>Late</span>
 
              <FormCheckbox
                id="mother-late"
                name="Mother-late"
                checked={formData.late}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, late: val }))
                }
              />
            </div>
          </div>
 
          <Dropdown
            dropdownname="Blood Group"
            name="bloodGroup"
            results={["A+","A-","B+","B-","O+","O-","AB+","AB-"]}
            value={formData.bloodGroup}
            onChange={handleChange}
          />
 
          <Dropdown
            dropdownname="Nationality"
            name="nationality"
            results={["Indian","American","Canadian","Other"]}
            value={formData.nationality}
            onChange={handleChange}
          />
        </div>
 
        {/* Row 2 */}
        <div className={styles.row}>
          <Inputbox
            label="Occupation"
            name="occupation"
            placeholder="Enter Occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
 
          <Inputbox
            label="Email"
            name="email"
            placeholder="Enter email id"
            value={formData.email}
            onChange={handleChange}
          />
 
          <Inputbox
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
 
        {/* Row 3 — Employee ID if in org */}
        {showEmployeeId && (
          <div className={styles.row}>
            <Inputbox
              label="Employee ID"
              name="employeeId"
              placeholder="Enter Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>
        )}
 
      </div>
    </div>
  );
};
 
export default MotherInfo;
 
 