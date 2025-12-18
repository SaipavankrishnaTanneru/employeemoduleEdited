// ✅ FIXED OnboardingFooter — works for DO and CO roles
import React from "react";
import styles from "./OnboardingFooter.module.css";
import Button from 'widgets/Button/Button';
import leftarrow from 'assets/EmployeeOnBoarding/leftarrow';
import rightarrow from 'assets/EmployeeOnBoarding/rightarrow';
import skipicon from 'assets/EmployeeOnBoarding/skipicon.svg';

const OnboardingFooter = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onFinish,
  allSteps,
  role,
  isSubmitting = false,
  primaryButtonLabel = null,
  skipButtonLabel = null,
  hideSkip = false
}) => {

  const isLastStep = currentStep === totalSteps - 1;
  const nextStepLabel = allSteps[currentStep + 1]?.label;

  // 👉 Finish button label
  const finishButtonLabel =
    role === "CO" ? "Proceed to Checklist" : "Add CTC Info";

  const buttonLabel =
    primaryButtonLabel ||
    (isLastStep ? finishButtonLabel : `Proceed to ${nextStepLabel}`);

  // 👉 Correct Skip label based on role
  const skipLabel =
    skipButtonLabel ||
    (role === "CO"
      ? "Skip all and Proceed to Checklist"
      : "Skip all and Add CTC info");

  // 👉 Primary button handler
  const handlePrimaryClick = () => {
    if (isLastStep) {
      if (onFinish && !isSubmitting) onFinish();
    } else {
      onNext();
    }
  };

  // 👉 Skip handler
  const handleSkipClick = () => {
    if (onFinish && !isSubmitting) onFinish();
  };

  // 👉 Detect Formik submit mode (Salary details)
  const isFormikSubmit =
    typeof onFinish === "function" &&
    primaryButtonLabel?.includes("Checklist");

  return (
    <footer className={styles.footerContainer}>
      
      <div className={styles.center}>
        {/* BACK */}
        <Button
          buttonname="Back"
          lefticon={leftarrow}
          variant="secondary"
          onClick={onBack}
          type="button"
          disabled={isSubmitting}
          width="110px"
        />

        {/* PROCEED */}
        <Button
          buttonname={buttonLabel}
          righticon={rightarrow}
          variant="primary"
          onClick={!isFormikSubmit ? handlePrimaryClick : undefined}
          type={isFormikSubmit ? "submit" : "button"}
          disabled={isSubmitting}
          width="250px"
        />
      </div>

      {/* SKIP BUTTON — hides based on parent logic */}
      {!hideSkip && (
        <div className={styles.right}>
          <button
            className={styles.skipButton}
            onClick={handleSkipClick}
            disabled={isSubmitting}
          >
            <img src={skipicon} alt="skip" className={styles.skipIcon} />
            <span className={styles.skipText}>{skipLabel}</span>
          </button>
        </div>
      )}
    </footer>
  );
};

export default OnboardingFooter;
