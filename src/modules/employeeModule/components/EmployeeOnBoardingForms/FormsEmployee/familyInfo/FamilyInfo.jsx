import React, { useState } from "react";

import FatherInfo from "./FatherInfo";
import MotherInfo from "./MotherInfo";
import FormCheckbox from "widgets/Checkbox/Checkbox";

import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";

import styles from "../familyInfo/FamilyInfo.module.css";

import { ReactComponent as BorderIcon } from 'assets/Qualification/border.svg';
import { ReactComponent as UploadIcon } from "assets/Qualification/Upload.svg";

const FamilyInfo = () => {
  /** ------------------ STATE -------------------- */
  const [familyMembers, setFamilyMembers] = useState([]);

  const [fatherOrg, setFatherOrg] = useState(false);
  const [motherOrg, setMotherOrg] = useState(false);

  /** ------------------ UTILITY ------------------ */
  const updateField = (index, field, value) => {
    const updated = [...familyMembers];
    updated[index][field] = value;
    setFamilyMembers(updated);
  };

  /** ------------------ ADD ------------------ */
  const handleAddMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      {
        name: "",
        relation: "",
        bloodGroup: "",
        nationality: "",
        email: "",
        phone: "",
        occupation: "",
        aadharNum: "",
        DateOfBirth: "",
        isLate: false,
      },
    ]);
  };

  /** ------------------ CLEAR ------------------ */
  const handleClear = (index) => {
    const updated = [...familyMembers];
    updated[index] = {
      name: "",
      relation: "",
      bloodGroup: "",
      nationality: "",
      email: "",
      phone: "",
      occupation: "",
      isLate: false,
    };
    setFamilyMembers(updated);
  };

  /** ------------------ REMOVE ------------------ */
  const handleRemove = (index) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  /** ------------------ OPTIONS ------------------ */
  const relations = ["Brother", "Sister", "Spouse", "Child", "Other"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const nationalities = ["Indian", "American", "Canadian", "Other"];

  /** ------------------ JSX ------------------ */
  return (
    <div className={styles.container}>

      {/* Father Section */}
      <div className={styles.sectionTitle}>
        <span>Father Information</span> <BorderIcon />
      </div>

      <div className={styles.orgRow}>
        <span className={styles.orgLabel}>Is in Organization?</span>
        <FormCheckbox
          name="fatherOrg"
          checked={fatherOrg}
          onChange={(val) => setFatherOrg(val)}
        />
      </div>

      <FatherInfo showEmployeeId={fatherOrg} />

      {/* Mother Section */}
      <div className={styles.sectionTitle}>
        <span>Mother Information</span> <BorderIcon />
      </div>

      <div className={styles.orgRow}>
        <span className={styles.orgLabel}>Is in Organization?</span>
        <FormCheckbox
          name="motherOrg"
          checked={motherOrg}
          onChange={(val) => setMotherOrg(val)}
        />
      </div>

      <MotherInfo showEmployeeId={motherOrg} />

      {/* Upload Family Photo */}
      <div className={styles.uploadWrapper}>
        <label className={styles.uploadLabel}>Upload Family Group Photo</label>

        <input type="file" id="familyPhoto" hidden />

        <label htmlFor="familyPhoto" className={styles.uploadButton}>
          <UploadIcon /> Upload Photo
        </label>
      </div>

      {/* ---------------- Dynamic Family Members ---------------- */}
      {familyMembers.map((member, index) => (
        <AddFieldWidget
          key={index}
          index={index}
          title={`Family Member ${index + 1}`}
          onClear={() => handleClear(index)}
          onRemove={() => handleRemove(index)}
        >
          <div className={styles.sectionBlock}>

            {/* Row 1 */}
            <div className={styles.row}>
              <Inputbox
                label="Name"
                name="name"
                placeholder="Enter Name"
                value={member.name}
                onChange={(e) =>
                  updateField(index, "name", e.target.value)
                }
              />

              <Dropdown
                dropdownname="Relation"
                name="relation"
                results={relations}
                value={member.relation}
                onChange={(e) =>
                  updateField(index, "relation", e.target.value)
                }
              />

              <Dropdown
                dropdownname="Blood Group"
                name="bloodGroup"
                results={bloodGroups}
                value={member.bloodGroup}
                onChange={(e) =>
                  updateField(index, "bloodGroup", e.target.value)
                }
              />
            </div>

            {/* Row 2 */}
            <div className={styles.row}>
              <Dropdown
                dropdownname="Nationality"
                name="nationality"
                results={nationalities}
                value={member.nationality}
                onChange={(e) =>
                  updateField(index, "nationality", e.target.value)
                }
              />

              <Inputbox
                label="Occupation"
                name="occupation"
                placeholder="Enter Occupation"
                value={member.occupation}
                onChange={(e) =>
                  updateField(index, "occupation", e.target.value)
                }
              />

              <Inputbox
                label="Email"
                name="email"
                placeholder="Enter Email"
                value={member.email}
                onChange={(e) =>
                  updateField(index, "email", e.target.value)
                }
              />
            </div>

            {/* Row 3 */}
            <div className={styles.row}>
              <Inputbox
                label="Phone Number"
                name="phone"
                placeholder="Enter Phone Number"
                value={member.phone}
                onChange={(e) =>
                  updateField(index, "phone", e.target.value)
                }
              />
            </div>

          </div>
        </AddFieldWidget>
      ))}

      {/* Add Member */}
      <div className={styles.addFamilyWrapper}>
        <button className={styles.addFamilyBtn} onClick={handleAddMember}>
          + Add Family Member
        </button>
      </div>

    </div>
  );
};

export default FamilyInfo;
