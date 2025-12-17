import React, { useState, useEffect } from "react";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import styles from "./WorkExperienceForm.module.css";

// ---- MASTER DATA ----
const campusOptions = [
  { id: "988", name: "Main Campus", code: "MC-01", type: "Urban", location: "Hyderabad" },
  { id: "989", name: "North Campus", code: "NC-02", type: "Rural", location: "Delhi" },
  { id: "990", name: "South Campus", code: "SC-03", type: "Urban", location: "Bangalore" }
];

const buildingOptions = [
  { id: "68", name: "Building A", dean: "Dr. Rao", agm: "Mr. Kumar" },
  { id: "101", name: "Building B", dean: "Dr. Singh", agm: "Ms. Sharma" },
  { id: "203", name: "Building C", dean: "Dr. Patel", agm: "Mr. Das" }
];

const managerIds = ["4079", "5112"];
const workModeIds = ["1", "2", "3"];
const joinTypeIds = ["1", "2", "3"];
const replacementIds = ["0", "123", "456"];
const hiringModeIds = ["1", "2", "3"];
const hiredByIds = ["4079", "5112"];

const WorkExperienceForm = ({ values = {}, onChange }) => {
  const [formData, setFormData] = useState({
    campusId: values.campusId || "",
    buildingId: values.buildingId || "",
    managerId: values.managerId || "",
    empWorkModeId: values.empWorkModeId || "",
    joinTypeId: values.joinTypeId || "",
    replacedByEmpId: values.replacedByEmpId || "",
    modeOfHiringId: values.modeOfHiringId || "",
    hiredByEmpId: values.hiredByEmpId || "",
    dateOfJoin: values.dateOfJoin || ""
  });

  useEffect(() => setFormData((prev) => ({ ...prev, ...values })), [values]);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    onChange?.(name, value);
  };

  // FIND SELECTED CAMPUS
  const selectedCampus = campusOptions.find((c) => c.id === formData.campusId);

  // FIND SELECTED BUILDING
  const selectedBuilding = buildingOptions.find((b) => b.id === formData.buildingId);

  // Convert to strings for dropdown
  const toStringList = (arr) => arr.map((o) => `${o.id}:::${o.name}`);

  const extractId = (str) => str.split(":::")[0];

  return (
    <div className={styles.WorkExperience_container}>
      <div className={styles.formGrid}>

        {/* CAMPUS ROW */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Campus"
            name="campusId"
            value={
              selectedCampus ? `${selectedCampus.id}:::${selectedCampus.name}` : ""
            }
            results={[":::Select Campus", ...toStringList(campusOptions)]}
            onChange={(e) => updateField("campusId", extractId(e.target.value))}
          />

          <Inputbox label="Campus Code" value={selectedCampus?.code || ""} disabled />
          <Inputbox label="Campus Type" value={selectedCampus?.type || ""} disabled />
          <Inputbox label="Location" value={selectedCampus?.location || ""} disabled />
        </div>

        {/* BUILDING ROW */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Building"
            name="buildingId"
            value={
              selectedBuilding ? `${selectedBuilding.id}:::${selectedBuilding.name}` : ""
            }
            results={[":::Select Building", ...toStringList(buildingOptions)]}
            onChange={(e) => updateField("buildingId", extractId(e.target.value))}
          />

          <Inputbox label="Dean Name" value={selectedBuilding?.dean || ""} disabled />
          <Inputbox label="AGM Name" value={selectedBuilding?.agm || ""} disabled />
        </div>

        {/* MANAGER / WORK MODE / JOIN AS */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Manager ID"
            name="managerId"
            value={formData.managerId}
            results={managerIds}
            onChange={(e) => updateField("managerId", e.target.value)}
          />

          <Dropdown
            dropdownname="Working Mode"
            name="empWorkModeId"
            value={formData.empWorkModeId}
            results={workModeIds}
            onChange={(e) => updateField("empWorkModeId", e.target.value)}
          />

          <Dropdown
            dropdownname="Joining As"
            name="joinTypeId"
            value={formData.joinTypeId}
            results={joinTypeIds}
            onChange={(e) => updateField("joinTypeId", e.target.value)}
          />
        </div>

        {/* REPLACEMENT / MODE / HIRED BY */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Replacement Employee"
            name="replacedByEmpId"
            value={formData.replacedByEmpId}
            results={replacementIds}
            onChange={(e) => updateField("replacedByEmpId", e.target.value)}
          />

          <Dropdown
            dropdownname="Mode of Hiring"
            name="modeOfHiringId"
            value={formData.modeOfHiringId}
            results={hiringModeIds}
            onChange={(e) => updateField("modeOfHiringId", e.target.value)}
          />

          <Dropdown
            dropdownname="Hired By"
            name="hiredByEmpId"
            value={formData.hiredByEmpId}
            results={hiredByIds}
            onChange={(e) => updateField("hiredByEmpId", e.target.value)}
          />
        </div>

        {/* DATE ROW */}
        <div className={styles.row}>
          <Inputbox
            label="Date of Joining"
            type="date"
            name="dateOfJoin"
            value={formData.dateOfJoin}
            disabled
          />
        </div>

      </div>
    </div>
  );
};

export default WorkExperienceForm;
