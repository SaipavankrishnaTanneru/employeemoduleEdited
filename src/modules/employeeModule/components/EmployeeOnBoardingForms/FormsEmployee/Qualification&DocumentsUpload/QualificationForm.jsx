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
        onSubmit={(values) => {}}
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
                       forceFieldset = {false}
                       showSimpleTitle = {false}
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
                        
                        <Field
                          name={`qualifications.${index}.qualification`}
                          component={FormikDropdown}
                          dropdownname="Qualification"
                          results={qualificationOptions}
                        />

                        <Field
                          name={`qualifications.${index}.degree`}
                          component={FormikDropdown}
                          dropdownname="Degree"
                          results={degreeOptions}
                        />

                        <Field
                          name={`qualifications.${index}.specialization`}
                          component={Inputbox}
                          label="Specialization"
                          placeholder="Enter Specialization"
                        />

                        <Field
                          name={`qualifications.${index}.university`}
                          component={Inputbox}
                          label="University"
                          placeholder="Enter University"
                        />

                        <Field
                          name={`qualifications.${index}.institute`}
                          component={Inputbox}
                          label="Institute"
                          placeholder="Enter Institute"
                        />

                        <Field
                          name={`qualifications.${index}.year`}
                          component={Inputbox}
                          type="number"
                          label="Passed out Year"
                          placeholder="Enter Year"
                        />

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
