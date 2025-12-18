import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import styles from "./PreviousEmployeeInfo.module.css";

// Assuming these are your components
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
        onSubmit={(values) => {
          console.log("Submitted:", values);
        }}
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

                        {/* 1. Company Name */}
                        <Field name={`previousEmployers.${index}.companyName`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="Company Name"
                              placeholder="Enter Full Name"
                            />
                          )}
                        </Field>

                        {/* 2. Designation */}
                        <Field name={`previousEmployers.${index}.designation`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="Designation"
                              placeholder="Enter Designation"
                            />
                          )}
                        </Field>

                        {/* 3. From Date */}
                        <Field name={`previousEmployers.${index}.fromDate`}>
                            {/* Pass 'form' in case Dropdown needs setFieldValue */}
                           {({ field, form }) => (
                            <FormikDropdown
                              {...field}
                              form={form} 
                              dropdownname="From"
                              results={fromOptions}
                            />
                          )}
                        </Field>

                        {/* Row 2 */}
                        {/* 4. To Date */}
                        <Field name={`previousEmployers.${index}.toDate`}>
                           {({ field, form }) => (
                            <FormikDropdown
                              {...field}
                              form={form}
                              dropdownname="To"
                              results={toOptions}
                            />
                          )}
                        </Field>

                        {/* 5. Leaving Reason */}
                        <Field name={`previousEmployers.${index}.leavingReason`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="Leaving Reason"
                              placeholder="Enter Reason"
                            />
                          )}
                        </Field>

                        {/* 6. Address Line 1 */}
                        <Field name={`previousEmployers.${index}.companyAddressLine1`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="Company Address Line 1"
                              placeholder="Enter Address"
                            />
                          )}
                        </Field>

                        {/* Row 3 */}
                        {/* 7. Address Line 2 */}
                        <Field name={`previousEmployers.${index}.companyAddressLine2`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="Company Address Line 2"
                              placeholder="Enter Address"
                            />
                          )}
                        </Field>

                        {/* 8. Nature of Duties - FIXED TYPO HERE */}
                        <Field name={`previousEmployers.${index}.natureOfDuties`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="Nature of Duties"
                              placeholder="Enter Duties"
                            />
                          )}
                        </Field>

                        {/* 9. Gross Salary */}
                        <Field name={`previousEmployers.${index}.grossSalaryPerMonth`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="Gross Salary (Monthly)"
                              placeholder="Enter Salary"
                            />
                          )}
                        </Field>

                        {/* 10. CTC */}
                        <Field name={`previousEmployers.${index}.ctc`}>
                          {({ field }) => (
                            <Inputbox
                              {...field}
                              label="CTC"
                              placeholder="Enter CTC"
                            />
                          )}
                        </Field>
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