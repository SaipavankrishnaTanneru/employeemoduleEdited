import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import FatherInfo from "./FatherInfo";
import MotherInfo from "./MotherInfo";
import FormCheckbox1 from 'widgets/FormCheckBox/FormCheckBox';
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";

import styles from "../familyInfo/FamilyInfo.module.css";

import { ReactComponent as BorderIcon } from 'assets/Qualification/border.svg';
import { ReactComponent as UploadIcon } from "assets/Qualification/Upload.svg";

// --- Initial Values ---
const initialMember = {
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
};

const initialValues = {
  fatherOrg: false,
  motherOrg: false,
  familyMembers: [], // Start empty or with one member if needed
};

// --- Options ---
const relations = ["Brother", "Sister", "Spouse", "Child", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const nationalities = ["Indian", "American", "Canadian", "Other"];

// --- Validation ---
const validationSchema = Yup.object().shape({
  familyMembers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      relation: Yup.string().required("Relation is required"),
      // Add other validations as needed
    })
  ),
});

const FamilyInfo = () => {
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitted Family Info:", values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* ---------------- FATHER SECTION ---------------- */}
            <div className={styles.sectionTitle}>
              <span>Father Information</span> <BorderIcon />
            </div>

            <div className={styles.checkbox_section}>
              <div className={styles.checkbox_wrapper}>
                <span className={styles.checkbox_label}>Is in Organization?</span>
                
                {/* Manual Field for Checkbox to handle custom component */}
                <Field name="fatherOrg">
                  {({ field, form }) => (
                    <FormCheckbox1
                      id="father-org"
                      name="fatherOrg"
                      checked={field.value}
                      onChange={(val) => form.setFieldValue("fatherOrg", val)}
                    />
                  )}
                </Field>
              </div>
            </div>

            {/* Pass the Formik value to the sub-component */}
            <FatherInfo showEmployeeId={values.fatherOrg} />

            {/* ---------------- MOTHER SECTION ---------------- */}
            <div className={styles.sectionTitle}>
              <span>Mother Information</span> <BorderIcon />
            </div>

            <div className={styles.checkbox_section}>
              <div className={styles.checkbox_wrapper}>
                <span className={styles.checkbox_label}>Is in Organization?</span>
                
                <Field name="motherOrg">
                  {({ field, form }) => (
                    <FormCheckbox1
                      id="mother-org"
                      name="motherOrg"
                      checked={field.value}
                      onChange={(val) => form.setFieldValue("motherOrg", val)}
                    />
                  )}
                </Field>
              </div>
            </div>

            <MotherInfo showEmployeeId={values.motherOrg} />

            {/* ---------------- UPLOAD PHOTO ---------------- */}
            <div className={styles.uploadWrapper}>
              <label className={styles.uploadLabel}>Upload Family Group Photo</label>
              <input type="file" id="familyPhoto" hidden />
              <label htmlFor="familyPhoto" className={styles.uploadButton}>
                <UploadIcon /> Upload Photo
              </label>
            </div>

            {/* ---------------- DYNAMIC FAMILY MEMBERS ---------------- */}
            <FieldArray name="familyMembers">
              {({ push, remove }) => (
                <>
                  {values.familyMembers.map((member, index) => (
                    <AddFieldWidget
                      key={index}
                      index={index}
                      title={`Family Member ${index + 1}`}
                      // --- CRITICAL FIXES FOR DESIGN ---
                      enableFieldset={true}
                      forceFieldset={true} // Forces the "Card" look even for the first item
                      showSimpleTitle={false}
                      // -------------------------------
                      onClear={() => {
                         Object.entries(initialMember).forEach(([key, v]) => {
                           setFieldValue(`familyMembers.${index}.${key}`, v);
                         });
                      }}
                      onRemove={() => remove(index)}
                    >
                      <div className={styles.sectionBlock}>
                        {/* Row 1 */}
                        <div className={styles.row}>
                          <Field name={`familyMembers.${index}.name`}>
                            {({ field }) => (
                              <Inputbox
                                {...field} // Spreads name, value, onChange, onBlur
                                label="Name"
                                placeholder="Enter Name"
                              />
                            )}
                          </Field>

                          <Field name={`familyMembers.${index}.relation`}>
                            {({ field, form }) => (
                              <Dropdown
                                field={field}
                                form={form}
                                dropdownname="Relation"
                                results={relations}
                              />
                            )}
                          </Field>

                          <Field name={`familyMembers.${index}.bloodGroup`}>
                            {({ field, form }) => (
                              <Dropdown
                                field={field}
                                form={form}
                                dropdownname="Blood Group"
                                results={bloodGroups}
                              />
                            )}
                          </Field>
                        </div>

                        {/* Row 2 */}
                        <div className={styles.row}>
                          <Field name={`familyMembers.${index}.nationality`}>
                            {({ field, form }) => (
                              <Dropdown
                                field={field}
                                form={form}
                                dropdownname="Nationality"
                                results={nationalities}
                              />
                            )}
                          </Field>

                          <Field name={`familyMembers.${index}.occupation`}>
                            {({ field }) => (
                              <Inputbox
                                {...field}
                                label="Occupation"
                                placeholder="Enter Occupation"
                              />
                            )}
                          </Field>

                          <Field name={`familyMembers.${index}.email`}>
                            {({ field }) => (
                              <Inputbox
                                {...field}
                                label="Email"
                                placeholder="Enter Email"
                              />
                            )}
                          </Field>
                        </div>

                        {/* Row 3 */}
                        <div className={styles.row}>
                          <Field name={`familyMembers.${index}.phone`}>
                            {({ field }) => (
                              <Inputbox
                                {...field}
                                label="Phone Number"
                                placeholder="Enter Phone Number"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </AddFieldWidget>
                  ))}

                  {/* Add Member Button */}
                  <div className={styles.addFamilyWrapper}>
                    <button
                      type="button" // Important: type="button" prevents form submission
                      className={styles.addFamilyBtn}
                      onClick={() => push(initialMember)}
                    >
                      + Add Family Member
                    </button>
                  </div>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FamilyInfo;