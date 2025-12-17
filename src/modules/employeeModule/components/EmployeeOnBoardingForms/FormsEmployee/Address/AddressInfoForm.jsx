import React from 'react';
import FormCheckbox from 'widgets/FormCheckBox/FormCheckBox';
import AddressSection from '../../../EmployeeOnBoardingForms/FormsEmployee/AddressSection/AddressSection';
import { useAddressFormik } from '../../../../hooks/useAddressFormik';
import { createAddressFields, defaultCities, defaultStates, defaultCountries } from '../../../../utils/fieldConfigs';
import styles from './AddressInfoForm.module.css';

const AddressInfoFormNew = () => {
  const { 
    values,
    errors,
    touched,
    handleFieldChange,
    handleCheckboxChange,
    setFieldTouched,
  } = useAddressFormik();

  const addressFields = createAddressFields(defaultCities, defaultStates, defaultCountries);

  const handleFieldBlur = (section, field) => 
    setFieldTouched(`${section}.${field}`, true);

  return (
    <div className={styles.address_form_container}>

      {/* --- CURRENT ADDRESS --- */}
      <AddressSection
        title="Current Address"
        fields={addressFields}
        section="currentAddress"
        values={values.currentAddress}
        errors={errors.currentAddress || {}}
        touched={touched.currentAddress || {}}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
        showDivider={false}
      />

      {/* --- CHECKBOX SECTION BELOW CURRENT ADDRESS --- */}
      <div className={styles.checkbox_section}>
        <div className={styles.checkbox_wrapper}>
          <FormCheckbox
            name="permanentAddressSame"
            checked={values.permanentAddressSame}
            onChange={handleCheckboxChange}
          />
          <span className={styles.checkbox_label}>
            Permanent Address Same as Current Address
          </span>
        </div>
      </div>

      {/* --- PERMANENT ADDRESS --- */}
      {values.permanentAddressSame && (
        <AddressSection
          title="Permanent Address"
          fields={addressFields}
          section="permanentAddress"
          values={values.permanentAddress}
          errors={errors.permanentAddress || {}}
          touched={touched.permanentAddress || {}}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          showDivider={true}
        />
      )}
    </div>
  );
};

export default AddressInfoFormNew;
