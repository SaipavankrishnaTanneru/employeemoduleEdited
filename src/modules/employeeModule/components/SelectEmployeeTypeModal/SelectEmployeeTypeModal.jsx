import React, { useState } from "react";
import styles from "./SelectEmployeeTypeModal.module.css"; // We will create this CSS file next
import Button from "widgets/Button/Button"; // Re-using your Button
import RightArrow from 'assets/icons/rightarrow.jsx';


const SelectEmployeeTypeModal = ({ open, onClose, onSubmit }) => {
  // 1. State to track the selected type
  const [selectedType, setSelectedType] = useState("Teach"); // "Teach" or "Non Teach"

  if (!open) return null;

  const handleSubmit = () => {
    if (!selectedType) return; // Don't submit if nothing is selected
    onSubmit(selectedType);
    onClose();
    setSelectedType(""); // Reset for next time
  };

  const handleClose = () => {
    onClose();
    setSelectedType(""); // Reset on close
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Select Employee Type</h2>
          <span className={styles.closeText} onClick={handleClose}>×</span>
        </div>

        {/* Body - This is the new part */}
        <div className={styles.body}>
          <div className={styles.typeSelector}>
            <button
              className={`${styles.typeButton} ${
                selectedType === "Teach" ? styles.active : ""
              }`}
              onClick={() => setSelectedType("Teach")}
            >
              Teach
            </button>
            <button
              className={`${styles.typeButton} ${
                selectedType === "Non Teach" ? styles.active : ""
              }`}
              onClick={() => setSelectedType("Non Teach")}
            >
              Non Teach
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {/* The "Next" button is disabled until a type is selected.
            This is good UX.
          */}
         <Button
  buttonname="Next"
  onClick={handleSubmit}
  type="button"
  righticon={<RightArrow />}
  variant="primary"
  width="123px"
  disabled={!selectedType}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectEmployeeTypeModal;