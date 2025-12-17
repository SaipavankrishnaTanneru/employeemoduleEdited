import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import styles from "./PreviousEmployeeInfo.module.css";

import Inputbox from "widgets/Inputbox/InputBox";
import FormikDropdown from "widgets/Dropdown/Dropdown";
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";

import dividerline from 'assets/Qualification/border.svg';

const initialEmployer = {
  companyName: "",
  designation: "",
  fromDate: "",
  toDate: "",
  leavingReason: "",
  companyAddressLine1: "",
  companyAddressLine2: "",
  natureOfDuties: "",
  grossSalaryPerMonth: "",
  ctc: "",
};

const fromOptions = ["Jan 2020", "Feb 2020", "Mar 2020", "Apr 2020"];
const toOptions = ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"];

const validationSchema = Yup.object().shape({
  previousEmployers: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Required"),
      designation: Yup.string().required("Required"),
      fromDate: Yup.string().required("Required"),
      toDate: Yup.string().required("Required"),
    })
  ),
});

const PreviousEmployerDetails = () => {
  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ previousEmployers: [initialEmployer] }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* SECTION HEADER WITH DIVIDER */}
            <div className={styles.section_header}>
              <h3 className={styles.section_title}>Previous Employer Details</h3>
              <img src={dividerline} alt="divider" className={styles.dividerImage} />
            </div>

            <FieldArray name="previousEmployers">
              {({ push, remove }) => (
                <>
                  {values.previousEmployers.map((item, index) => (
                    <AddFieldWidget
                      key={index}
                      index={index}
                      title={`Employer ${index + 1}`}
                      enableFieldset={true}
                      showSimpleTitle={false}
                      onClear={() => {
                        Object.entries(initialEmployer).forEach(([key, v]) =>
                          setFieldValue(`previousEmployers.${index}.${key}`, v)
                        );
                      }}
                      onRemove={() => remove(index)}
                    >
                      {/* FORM GRID */}
                      <div className={styles.formGrid}>

                        <Field
                          name={`previousEmployers.${index}.companyName`}
                          component={Inputbox}
                          label="Company Name"
                          placeholder="Enter Full Name"
                        />

                        <Field
                          name={`previousEmployers.${index}.designation`}
                          component={Inputbox}
                          label="Designation"
                          placeholder="Enter Designation"
                        />

                        <Field
                          name={`previousEmployers.${index}.fromDate`}
                          component={FormikDropdown}
                          dropdownname="From"
                          results={fromOptions}
                        />

                        {/* Row 2 */}
                        <Field
                          name={`previousEmployers.${index}.toDate`}
                          component={FormikDropdown}
                          dropdownname="To"
                          results={toOptions}
                        />

                        <Field
                          name={`previousEmployers.${index}.leavingReason`}
                          component={Inputbox}
                          label="Leaving Reason"
                          placeholder="Enter Reason"
                        />

                        <Field
                          name={`previousEmployers.${index}.companyAddressLine1`}
                          component={Inputbox}
                          label="Company Address Line 1"
                          placeholder="Enter Address"
                        />

                        {/* Row 3 */}
                        <Field
                          name={`previousEmployers.${index}.companyAddressLine2`}
                          component={Inputbox}
                          label="Company Address Line 2"
                          placeholder="Enter Address"
                        />

                        <Field
                          name={`previousEmployers}.${index}.natureOfDuties`}
                          component={Inputbox}
                          label="Nature of Duties"
                          placeholder="Enter Duties"
                        />

                        <Field
                          name={`previousEmployers.${index}.grossSalaryPerMonth`}
                          component={Inputbox}
                          label="Gross Salary (Monthly)"
                          placeholder="Enter Salary"
                        />

                        <Field
                          name={`previousEmployers.${index}.ctc`}
                          component={Inputbox}
                          label="CTC"
                          placeholder="Enter CTC"
                        />
                      </div>
                    </AddFieldWidget>
                  ))}

                  {/* ADD BUTTON */}
                  <div className={styles.addButtonContainer}>
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() => push(initialEmployer)}
                    >
                      + Add Employer
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

export default PreviousEmployerDetails;
