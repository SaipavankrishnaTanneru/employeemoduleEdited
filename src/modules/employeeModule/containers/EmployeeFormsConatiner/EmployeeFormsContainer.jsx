import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useMatch,
  useLocation,
} from "react-router-dom";

import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import EmployeeNavTabOnBoarding from "../../components/EmployeeOnBoardingForms/EmployeeOnBoardingFormNav/EmployeeNavtab";

import { onboardingSteps } from "../../config/onboardingTabs";
import { useAuth } from 'useAuth';
import QualificationForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/QualificationForm";
import UploadDocumentsForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/UploadDocumentsForm";
import BasicInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BasicInfoForms/EmployeeOnboardingForm";
import AddressInfoFormNew from "../../components/EmployeeOnBoardingForms/FormsEmployee/Address/AddressInfoForm";
import FamilyInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/familyInfo/FamilyInfo";
import PreviousEmployerInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/PreviousEmployeeInfo/PreviousEmployeeInfo";
import AgreementInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/AgreementInfoForm/AgreementInfoForm";
import CategoryInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/CategoryInfoForm/CategoryInfoForm";
import BankInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BankInfoForm/BankInfoForm";
import SalaryInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/SalaryInfo/salaryInfoForm";

import SuccessPage from "../../components/SuccessPage/SuccessPage";
import OnboardingFooter from "../../components/OnBoardingStatus/OnBoardingEmployeeFooter/OnboardingFooter";

import styles from "./EmployeeFormsContainer.module.css";

const NewEmployeeOnboardingForms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const role = user?.roles?.[0];
  const isHR = role === "HR";

  // Base Path
  const basePath = location.pathname.includes("/hr/")
    ? "/scopes/employee/hr/new-employee-onboarding"
    : "/scopes/employee/new-employee-onboarding";

  const match = useMatch(`${basePath}/:tab`);
  const currentTab = match?.params?.tab;

  const [showSuccess, setShowSuccess] = useState(false);

  // Determine active step
  let currentStep = onboardingSteps.findIndex((s) => s.path === currentTab);
  if (currentStep === -1) currentStep = 0;

  const totalSteps = onboardingSteps.length;

  // Navigation
  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      navigate(`${basePath}/${onboardingSteps[currentStep + 1].path}`);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      navigate(`${basePath}/${onboardingSteps[currentStep - 1].path}`);
    } else {
      navigate(-1);
    }
  };

  // Custom Step Logic
  const handleNextStep = async (step) => {
    try {
     if (step === 0) {
  setShowSuccess(true); // show instantly
  return;
}

      // Last step→Forward
      if (step === totalSteps - 1) {
        // TODO: Replace with a non-blocking notification system (e.g., toast)
        window.dispatchEvent(new CustomEvent('notify', { detail: { type: 'success', message: 'Employee forwarded to Divisional Officer successfully!' } }));
        return;
      }

      goNext();
    } catch (error) {

      window.dispatchEvent(new CustomEvent('notify', { detail: { type: 'error', message: 'An error occurred. Please try again.' } }));
    }
  };

  
  return (
    <div className={`${styles.mainContainer} ${isHR ? styles.hrContainer : ""}`}>
      {/* HEADER */}
      <div className={styles.headerWrapper}>
        <EmployeeOnboardingHeader
          step={currentStep + 1}
          totalSteps={totalSteps}
          onBack={goBack}
          mainTitle={
            isHR
              ? "HR Employee Onboarding Management"
              : "New Employee Onboarding"
          }
          subHeading=""
        />
      </div>

      {/* HIDE TABS WHEN MODAL IS OPEN */}
      {!showSuccess && (
        <div className={styles.navTabsWrapper}>
          <EmployeeNavTabOnBoarding basePath={basePath} />
        </div>
      )}

      {/* CONTENT AREA (Blur only by overlay) */}
      <div className={styles.contentArea}>
        <Routes>
          <Route
            index
            element={<Navigate to={onboardingSteps[0].path} replace />}
          />

          <Route path="basic-info" element={<BasicInfo />} />
          <Route path="address-info" element={<AddressInfoFormNew />} />
          <Route path="family-info" element={<FamilyInfo />} />
          <Route path="previous-employer-info" element={<PreviousEmployerInfo />} />
          <Route path="qualification" element={<QualificationForm />} />
          <Route path="upload-documents" element={<UploadDocumentsForm />} />
          <Route path="category-info" element={<CategoryInfo />} />
          <Route path="bank-info" element={<BankInfo />} />
          <Route path="agreements" element={<AgreementInfoForm />} />
          <Route path="salary-info" element={<SalaryInfoForm />} />
        </Routes>
      </div>

      {/* FOOTER (Hide during modal) */}
      {!showSuccess && (
        <OnboardingFooter
          currentStep={currentStep}
          totalSteps={totalSteps}
          allSteps={onboardingSteps}
          role={role}
          onNext={() => handleNextStep(currentStep)}
          onBack={goBack}
          hideSkip={true}
        />
      )}

    {showSuccess && (
  <SuccessPage
    mode="modal"
    title="Temp Id Generated Successfully"
    onClose={() => setShowSuccess(false)}
    onProceed={() => {
      setShowSuccess(false);
      navigate(`${basePath}/address-info`);
    }}
    proceedLabel="Proceed to Address Info"
  />
)}

    </div>
  );
};

export default NewEmployeeOnboardingForms;
