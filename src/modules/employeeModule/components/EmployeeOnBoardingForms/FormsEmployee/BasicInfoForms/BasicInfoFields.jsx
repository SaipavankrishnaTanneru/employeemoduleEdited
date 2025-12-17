import React, { useEffect, useState } from "react";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import GenderSelection from "../../../GenderSelection.jsx/GenderSelection";
import NavTabsWidget from "widgets/NavTabs/NavTabsWidget";
import styles from "./BasicInfoFields.module.css";

/* -------------------------------------------------------------------------- */
/* ICONS                                   */
/* -------------------------------------------------------------------------- */

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 19.3752V2.5835M15.5 2.5835L19.375 7.10433M15.5 2.5835L11.625 7.10433" stroke="#3425FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.3335 28.4165H20.6668C24.3197 28.4165 26.1474 28.4165 27.2815 27.2824C28.4168 26.1458 28.4168 24.3206 28.4168 20.6665V19.3749C28.4168 15.722 28.4168 13.8956 27.2815 12.7602C26.2895 11.7682 24.7679 11.6429 21.9585 11.6274M9.04183 11.6274C6.23245 11.6429 4.71087 11.7682 3.71887 12.7602C2.5835 13.8956 2.5835 15.722 2.5835 19.3749V20.6665C2.5835 24.3206 2.5835 26.1471 3.71887 27.2824C4.10637 27.6699 4.57395 27.9244 5.16683 28.0923" stroke="#3425FF" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
  </svg>
);

const EditIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2.375H3.95833C3.53841 2.375 3.13568 2.54181 2.83875 2.83875C2.54181 3.13568 2.375 3.53841 2.375 3.95833V15.0417C2.375 15.4616 2.54181 15.8643 2.83875 16.1613C3.13568 16.4582 3.53841 16.625 3.95833 16.625H15.0417C15.4616 16.625 15.8643 16.4582 16.1613 16.1613C16.4582 15.8643 16.625 15.4616 16.625 15.0417V9.5" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5468 2.07782C14.8617 1.76287 15.2889 1.58594 15.7343 1.58594C16.1797 1.58594 16.6068 1.76287 16.9218 2.07782C17.2367 2.39276 17.4137 2.81992 17.4137 3.26532C17.4137 3.71071 17.2367 4.13787 16.9218 4.45282L9.7865 11.5889C9.59851 11.7767 9.36628 11.9142 9.1112 11.9887L6.83674 12.6537C6.76862 12.6736 6.69641 12.6747 6.62767 12.6571C6.55893 12.6395 6.49619 12.6038 6.44601 12.5536C6.39584 12.5034 6.36007 12.4407 6.34246 12.3719C6.32485 12.3032 6.32604 12.231 6.34591 12.1629L7.01091 9.8884C7.08574 9.63352 7.2235 9.40157 7.4115 9.2139L14.5468 2.07782Z" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* -------------------------------------------------------------------------- */
/* FIELD CONFIGS                                */
/* -------------------------------------------------------------------------- */

const employeeTypeTabs = [
  { label: "Full Time / Regular", value: 1 },
  { label: "Consultant", value: 2 },
  { label: "Agency", value: 3 },
];

const genderOptions = [
  { label: "Male", value: 1 },
  { label: "Female", value: 2 },
];

// Group 1: Names
const nameFields = [
  { label: "First Name", name: "firstName", placeholder: "Enter first name" },
  { label: "Surname", name: "lastName", placeholder: "Enter surname" },
];

// Group 2: Identity Documents
const identityFields = [
  { label: "Aadhaar Enrollment No", name: "aadharEnrolmentNum", placeholder: "Enter Aadhaar number" },
  { label: "PAN Number", name: "pancardNum", placeholder: "Enter PAN number" },
  { label: "Aadhaar No", name: "aadharNum", placeholder: "Enter Aadhaar number" },
];

// Group 3: Personal Details
const personalFields = [
  { label: "Date of Birth", name: "dateOfBirth", type: "date" },
  { label: "Email", name: "email", placeholder: "Enter email" },
  { label: "Aadhaar Name", name: "adhaarName", placeholder: "Enter name as per Aadhaar" },
];

// Group 4: Contact & Previous Emp
const contactFields = [
  { label: "Father Name", name: "fatherName", placeholder: "Enter father name" },
  { label: "Phone Number", name: "primaryMobileNo", placeholder: "Enter phone number" },
  { label: "Previous ESI No", name: "preEsiNum", placeholder: "Enter ESI number" },
];

// Group 5: Experience
const workFields = [
  { label: "Previous UAN No", name: "preUanNum", placeholder: "Enter UAN number" },
  { label: "Total Experience", name: "totalExperience", placeholder: "Enter experience" },
];

/* -------------------------------------------------------------------------- */
/* COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const BasicInfoForm = ({ formik }) => {
  const { values, handleChange, setFieldValue, touched, errors, setFieldTouched } = formik;
  
  // Use local state for the image preview to avoid storing base64 strings in formik
  const [previewUrl, setPreviewUrl] = useState(values.profilePicture || null);

  // 1. Auto Calculate Age
  useEffect(() => {
    if (values.dateOfBirth) {
      const dob = new Date(values.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      setFieldValue("age", age);
    }
  }, [values.dateOfBirth, setFieldValue]);

  // 2. Handle File Upload (Performance Optimized)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
      alert("Image must be 300kb or less.");
      return;
    }

    // A. Create object URL for instant preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // B. Update Formik
    // If your backend needs the File object:
    setFieldValue("profilePictureFile", file); 
    // If your backend needs the Base64/URL:
    // (You can still do FileReader here if strictly required by backend, 
    // but separating preview from data is better for UI responsiveness)
    const reader = new FileReader();
    reader.onload = () => setFieldValue("profilePicture", reader.result);
    reader.readAsDataURL(file);
    
    e.target.value = null; // Reset input
  };

  const handleDeleteImage = () => {
    setFieldValue("profilePicture", null);
    setFieldValue("profilePictureFile", null);
    setPreviewUrl(null);
  };

  // Helper to render simple inputs
  const renderInputs = (fields) => fields.map(f => (
    <div className={styles.formField} key={f.name}>
      <Inputbox 
        {...f} 
        value={values[f.name]} 
        onChange={handleChange} 
        error={touched[f.name] && errors[f.name]}
      />
    </div>
  ));

  return (
    <div className={styles.container}>
      
      {/* --- Section 0: Employee Type --- */}
      <div className={styles.tabsRow}>
        <label className={styles.tabsLabel}>Select Employee Type</label>
        <NavTabsWidget
          options={employeeTypeTabs}
          value={values.modeOfHiringId}
          onChange={(val) => setFieldValue("modeOfHiringId", val)}
        />
      </div>

      <div className={styles.formGrid}>
        
        {/* --- Section 1: Names --- */}
        {renderInputs(nameFields)}

        {/* --- Section 2: Profile Picture (Visual Grid Position: Top Right) --- */}
        <div className={styles.formField}>
          <div className={styles.profileSection}>
            {!previewUrl ? (
              <>
                <label htmlFor="profileUpload" className={styles.profileUploadCircle}>
                  <UploadIcon />
                  <span className={styles.uploadText}>Upload image of Employee</span>
                </label>
                <p className={styles.imageNote}>Max image size is 300kb</p>
              </>
            ) : (
              <div className={styles.imageWrapper}>
                <img src={previewUrl} alt="Profile" className={styles.profileImg} />
                <label htmlFor="profileUpload" className={styles.editBtn}>
                  <EditIcon /> Edit
                </label>
                <button type="button" className={styles.deleteImageBtn} onClick={handleDeleteImage}>
                  <DeleteIcon />
                </button>
              </div>
            )}
            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* --- Section 3: Gender --- */}
        <div className={styles.formField}>
          <GenderSelection
            values={values}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            touched={touched}
            errors={errors}
            genderOptions={genderOptions}
            name="genderId"
            externalErrors={{}}
            isSubmitted={formik.submitCount > 0}
            onClearFieldError={() => {}}
          />
        </div>

        {/* --- Section 4: Identity Documents --- */}
        {renderInputs(identityFields)}

        {/* --- Section 5: Blood Group --- */}
        <div className={styles.formField}>
          <Dropdown
            dropdownname="Blood Group"
            name="bloodGroupId"
            results={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            value={values.bloodGroupId}
            onChange={(e) => setFieldValue("bloodGroupId", e.target.value)}
          />
        </div>

        {/* --- Section 6: SSC Special Case --- */}
        <div className={styles.formField}>
          <Inputbox
            label="SSC No"
            name="sscNo"
            placeholder="Enter SSC No"
            value={values.sscNo}
            disabled={values.sscNotAvailable}
            onChange={handleChange}
          />
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="sscNotAvailable"
              checked={values.sscNotAvailable}
              onChange={handleChange}
            />
            <label>Not Available</label>
          </div>
        </div>

        {/* --- Section 7: Personal Details --- */}
        {renderInputs(personalFields)}

        {/* Age (Read Only) */}
        <div className={styles.formField}>
          <Inputbox label="Age" name="age" value={values.age} disabled />
        </div>

        {/* Category */}
        <div className={styles.formField}>
          <Dropdown
            dropdownname="Category"
            name="categoryId"
            results={["General", "OBC", "SC", "ST"]}
            value={values.categoryId}
            onChange={(e) => setFieldValue("categoryId", e.target.value)}
          />
        </div>

        {/* --- Section 8: Contact & Family --- */}
        {renderInputs(contactFields)}

        {/* --- Section 9: Work Experience --- */}
        {renderInputs(workFields)}

        {/* Marital Status */}
        <div className={styles.formField}>
          <Dropdown
            dropdownname="Marital Status"
            name="maritalStatusId"
            results={["Single", "Married"]}
            value={values.maritalStatusId}
            onChange={(e) => setFieldValue("maritalStatusId", e.target.value)}
          />
        </div>

        {/* Qualification */}
        <div className={styles.formField}>
          <Dropdown
            dropdownname="Highest Qualification"
            name="qualificationId"
            results={["High School", "Bachelor's", "Master's", "PhD"]}
            value={values.qualificationId}
            onChange={(e) => setFieldValue("qualificationId", e.target.value)}
          />
        </div>

      </div>
    </div>
  );
};

export default BasicInfoForm;