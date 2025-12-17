import React from "react";
import { Formik, Form } from "formik";
import BasicInfoFields from "./BasicInfoFields";
import WorkExperienceFields from "./WorkExperienceForm";
import styles from "./EmployeeOnboardingForm.module.css";

const EmployeeOnboardingForm = () => {

  const initialValues = {
    empId: 0,
    modeOfHiringId: "",
    firstName: "",
    lastName: "",
    dateOfJoin: "",
    primaryMobileNo: "",
    email: "",
    genderId: "",
    referenceEmpId: "",
    hiredByEmpId: "",
    managerId: "",
    categoryId: "",
    reportingManagerId: "",
    empTypeId: "",
    qualificationId: "",
    empWorkModeId: "",
    replacedByEmpId: "",
    joinTypeId: "",
    contractStartDate: "",
    contractEndDate: "",
    adhaarName: "",
    dateOfBirth: "",
    aadharNum: "",
    aadharEnrolmentNum: "",
    pancardNum: "",
    bloodGroupId: "",
    casteId: "",
    religionId: "",
    maritalStatusId: "",
    emergencyPhNo: "",
    emergencyRelationId: "",
    sscNo: "",
    sscNotAvailable: false,
    preUanNum: "",
    preEsiNum: "",
    campusId: "",
    buildingId: "",
    totalExperience: "",
    profilePicture: null,
    createdBy: 5112,
    updatedBy: 5112,
    tempPayrollId: "",
    preChaitanyaId: "",
    age: "",
    fatherName: "",
    uanNo: ""
  };

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      profilePicture: "string" // backend requirement
    };

    console.log("FINAL PAYLOAD", payload);
    alert("Form Submitted Successfully");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form className={styles.formContainer}>

          <BasicInfoFields formik={formik} />

          <h2 className={styles.formSectionTitle}>Working Information</h2>
          <WorkExperienceFields formik={formik} />

          
          
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeOnboardingForm;
