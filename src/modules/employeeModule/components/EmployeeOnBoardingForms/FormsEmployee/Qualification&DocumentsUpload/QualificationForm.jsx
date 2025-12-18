import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from '../Qualification&DocumentsUpload/css/QualificationForm.module.css';

import FormikDropdown from '../Qualification&DocumentsUpload/FormikDropdown';
import Inputbox from 'widgets/Inputbox/InputBox';
import { ReactComponent as BorderIcon } from 'assets/Qualification/border.svg';
import { ReactComponent as UploadIcon } from 'assets/Qualification/Upload.svg';

import AddFieldWidget from 'widgets/AddFieldWidget/AddFieldWidget';

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round" />
  </svg>
);

/* ----------------------- VALIDATION ------------------------ */
const validationSchema = Yup.object().shape({
  qualifications: Yup.array().of(
    Yup.object().shape({
      qualification: Yup.string().required('Qualification is required'),
      degree: Yup.string().required('Degree is required'),
      university: Yup.string().required('University is required'),
      institute: Yup.string().required('Institute is required'),
      year: Yup.number().required('Year is required'),
      certificate: Yup.mixed().required('Certificate is required'),
    })
  ),
});

const initialQualification = {
  qualification: "",
  degree: "",
  specialization: "",
  university: "",
  institute: "",
  year: "",
  certificate: null,
};

const qualificationOptions = ["B.Tech", "M.Tech", "B.Sc", "M.Sc"];
const degreeOptions = ["Computer Science", "Electronics", "Mechanical", "Civil"];

/* ----------------------- FORM COMPONENT ------------------------ */
const QualificationForm = () => {
  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ qualifications: [initialQualification] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
           console.log("Submitted", values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="qualifications">
              {({ push, remove }) => (
                <>
                  {/* --- Title (first block only) --- */}
                  {values.qualifications.length > 0 && (
                    <h2 className={styles.formSectionTitle}>
                      Qualification Details <BorderIcon />
                    </h2>
                  )}

                  {/* ========== LOOP USING AddFieldWidget ========== */}
                  {values.qualifications.map((item, index) => (
                    <AddFieldWidget
                      key={index}
                      index={index}
                      title={`Qualification ${index + 1}`}
                      enableFieldset={true}
                      forceFieldset={false}
                      showSimpleTitle={false}
                      onClear={() => {
                        // Reset all fields in this index
                        Object.entries(initialQualification).forEach(([key, v]) => {
                          setFieldValue(`qualifications.${index}.${key}`, v);
                        });
                      }}
                      onRemove={() => remove(index)}
                    >
                      {/* ---------------- FIELD GRID ---------------- */}
                      <div className={styles.formGrid}>
                        
                        {/* 1. Qualification Dropdown */}
                        <Field name={`qualifications.${index}.qualification`}>
                            {({ field, form }) => (
                                <FormikDropdown 
                                    field={field} // Passed as object
                                    form={form}   // Passed as object
                                    dropdownname="Qualification" 
                                    results={qualificationOptions} 
                                />
                            )}
                        </Field>

                        {/* 2. Degree Dropdown */}
                        <Field name={`qualifications.${index}.degree`}>
                             {({ field, form }) => (
                                <FormikDropdown 
                                    field={field} // Passed as object
                                    form={form}   // Passed as object
                                    dropdownname="Degree" 
                                    results={degreeOptions} 
                                />
                            )}
                        </Field>

                        {/* 3. Specialization Input */}
                        <Field name={`qualifications.${index}.specialization`}>
                            {({ field }) => (
                                <Inputbox 
                                    {...field} // Passed spread (name, value, onChange)
                                    label="Specialization" 
                                    placeholder="Enter Specialization" 
                                />
                            )}
                        </Field>

                        {/* 4. University Input */}
                        <Field name={`qualifications.${index}.university`}>
                            {({ field }) => (
                                <Inputbox 
                                    {...field} 
                                    label="University" 
                                    placeholder="Enter University" 
                                />
                            )}
                        </Field>

                        {/* 5. Institute Input */}
                        <Field name={`qualifications.${index}.institute`}>
                            {({ field }) => (
                                <Inputbox 
                                    {...field} 
                                    label="Institute" 
                                    placeholder="Enter Institute" 
                                />
                            )}
                        </Field>

                        {/* 6. Year Input */}
                        <Field name={`qualifications.${index}.year`}>
                            {({ field }) => (
                                <Inputbox 
                                    {...field} 
                                    type="number"
                                    label="Passed out Year" 
                                    placeholder="Enter Year" 
                                />
                            )}
                        </Field>

                        {/* -------- File Upload -------- */}
                        <div className={styles.formGroup}>
                          {index === 0 && <label>Upload Certificate</label>}

                          <input
                            type="file"
                            hidden
                            id={`qCert-${index}`}
                            onChange={(e) =>
                              setFieldValue(
                                `qualifications.${index}.certificate`,
                                e.currentTarget.files[0]
                              )
                            }
                          />

                          <label htmlFor={`qCert-${index}`} className={styles.uploadButton}>
                            <UploadIcon /> Upload File
                          </label>

                          {values.qualifications[index].certificate && (
                            <span className={styles.fileName}>
                              {values.qualifications[index].certificate.name}
                            </span>
                          )}

                          <ErrorMessage
                            name={`qualifications.${index}.certificate`}
                            component="div"
                            className={styles.error}
                          />
                        </div>
                      </div>
                    </AddFieldWidget>
                  ))}

                  {/* ADD BUTTON */}
                  <div className={styles.addButtonContainer}>
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() => push(initialQualification)}
                    >
                      <AddIcon /> Add Qualification
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

export default QualificationForm;