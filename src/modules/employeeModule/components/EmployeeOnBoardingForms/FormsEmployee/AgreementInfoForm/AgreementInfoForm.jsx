import React, { useState } from "react";
import styles from "./AgreementInfoForm.module.css";

import Checkbox from "widgets/Checkbox/Checkbox";
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";

import {
  agreementInfoStaticFields,
  agreementInfoStaticLayout,
  chequeFields,
  chequeLayout,
} from "./agreementInfoFields";

import { renderField } from "renderField";

import dividerline from 'assets/Qualification/border.svg';

const AgreementInfoForm = () => {
  const [formData, setFormData] = useState({
    providedCheck: false,
    agreementCompany: "",
    agreementType: "",
    cheques: [{ chequeNo: "", chequeBank: "", ifscCode: "" }],
  });

  const setFieldValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChequeChange = (idx, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.cheques];
      updated[idx][field] = value;
      return { ...prev, cheques: updated };
    });
  };

  const addCheque = () => {
    setFormData((prev) => ({
      ...prev,
      cheques: [...prev.cheques, { chequeNo: "", chequeBank: "", ifscCode: "" }],
    }));
  };

  const clearCheque = (index) => {
    setFormData((prev) => {
      const updated = [...prev.cheques];
      updated[index] = { chequeNo: "", chequeBank: "", ifscCode: "" };
      return { ...prev, cheques: updated };
    });
  };

  const removeCheque = (index) => {
    setFormData((prev) => ({
      ...prev,
      cheques: prev.cheques.filter((_, i) => i !== index),
    }));
  };

  const staticFieldsMap = Object.fromEntries(
    agreementInfoStaticFields.map((f) => [f.name, f])
  );

  const chequeFieldsMap = Object.fromEntries(
    chequeFields.map((f) => [f.name, f])
  );

  return (
    <div className={styles.formContainer}>

      {/* ------- Section Title: AGREEMENT INFO ------- */}
      <div className={styles.section_header}>
        <h3 className={styles.section_title}>Agreement Info</h3>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      {/* ------- Static Fields (2 Column Layout) ------- */}
      {agreementInfoStaticLayout.map((row) => (
        <div key={row.id} className={styles.formGridTwo}>
          {row.fields.map((fname) => (
            <div key={fname} className={styles.cell}>
              {renderField(fname, staticFieldsMap, {
                value: formData[fname],
                onChange: (e) => setFieldValue(fname, e.target.value),
              })}
            </div>
          ))}
        </div>
      ))}

      {/* ------- Section Title: CHEQUE INFO ------- */}
      <div className={styles.section_header}>
        <h3 className={styles.section_title}>Cheque Info</h3>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      {/* ------- Checkbox for Provided Cheque ------- */}
      <div className={styles.checkboxContainer}>
        <Checkbox
          label="Provided Cheque?"
          name="providedCheck"
          checked={formData.providedCheck}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              providedCheck: e.target.checked,
            }))
          }
        />
      </div>

      {/* ------- Dynamic Cheque Blocks (AddFieldWidget) ------- */}
      {formData.cheques.map((cheque, index) => (
        <AddFieldWidget
          key={index}
          index={index}
          title={`Cheque ${index + 1}`}
          enableFieldset={true}
          showSimpleTitle={false}
          forceFieldset={false}
          onClear={() => clearCheque(index)}
          onRemove={() => removeCheque(index)}
        >
          {chequeLayout.map((row) => (
            <div key={row.id} className={styles.formGridThree}>
              {row.fields.map((fname) => (
                <div key={fname} className={styles.cell}>
                  {renderField(fname, chequeFieldsMap, {
                    value: cheque[fname],
                    onChange: (e) =>
                      handleChequeChange(index, fname, e.target.value),
                  })}
                </div>
              ))}
            </div>
          ))}
        </AddFieldWidget>
      ))}

      {/* ------- Add New Cheque Button ------- */}
      <div className={styles.addButtonContainer}>
        <button type="button" className={styles.addButton} onClick={addCheque}>
          + Add Cheque
        </button>
      </div>
    </div>
  );
};

export default AgreementInfoForm;
