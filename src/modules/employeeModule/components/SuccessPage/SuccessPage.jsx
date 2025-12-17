import React from "react";
import Lottie from "lottie-react";
import styles from "./SuccessPage.module.css";
import successAnimationData from 'assets/SkillTest/success-animation.json';
import rightarrow from 'assets/EmployeeOnBoarding/rightarrow.svg';

const SuccessPage = ({
  mode = "modal", // "modal" | "page"
  title = "Temp Id Generated Successfully",
  onClose,
  onProceed,
  showButtons = true,
  proceedLabel = "Proceed",
}) => {
  const isModal = mode === "modal";

  return (
    <div className={isModal ? styles.modalOverlay : styles.pageWrapper}>
      <div className={isModal ? styles.modalBox : styles.pageContent}>
        <div className={styles.lottieContainer}>
          <Lottie animationData={successAnimationData} loop={false} />
        </div>

        <h2 className={styles.successText}>{title}</h2>

        {/* Buttons only in modal mode */}
        {isModal && showButtons && (
          <div className={styles.buttonRow}>
            <button className={styles.closeBtn} onClick={onClose}>
              Close
            </button>
               <button className={styles.proceedBtn} onClick={onProceed}>
              <span>{proceedLabel}</span>
              <img src={rightarrow} alt="arrow" className={styles.arrowIcon} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
