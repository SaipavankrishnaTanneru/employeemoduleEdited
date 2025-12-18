import React, { useState, useMemo } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import EmployeeNavTabOnBoarding from "../../components/EmployeeOnBoardingForms/EmployeeOnBoardingFormNav/EmployeeNavtab";
import { onboardingSteps } from "../../config/onboardingTabs";
import { useAuth } from 'useAuth'; 

// --- Form Components ---
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

const NewEmployeeOnboardingForms = ({ hideSalary = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const role = user?.roles?.[0];
  const isHR = role === "HR";
  const [showSuccess, setShowSuccess] = useState(false);

  // -------------------------------------------------------------
  // 1. Filter Steps Logic (Memoized)
  // -------------------------------------------------------------
  // If hideSalary is true, we filter out the 'salary-info' step completely.
  const activeSteps = useMemo(() => {
    if (hideSalary) {
      return onboardingSteps.filter((step) => step.path !== 'salary-info');
    }
    return onboardingSteps;
  }, [hideSalary]);

  // -------------------------------------------------------------
  // 2. Dynamic Base Path Logic
  // -------------------------------------------------------------
  const pathParts = location.pathname.replace(/\/$/, "").split('/');
  const lastSegment = pathParts[pathParts.length - 1];
  
  // We check against activeSteps to see if we are currently on a valid tab
  const isCurrentPathATab = activeSteps.some(step => step.path === lastSegment);

  let basePath = location.pathname;
  if (isCurrentPathATab) {
    // If we are on a tab, strip the tab name to get the true base path
    basePath = pathParts.slice(0, -1).join('/');
  }
  // Ensure no trailing slash
  basePath = basePath.replace(/\/$/, "");

  // -------------------------------------------------------------
  // 3. Determine Active Step REACTIVELY
  // -------------------------------------------------------------
  // Find index in the filtered activeSteps array
  let currentStep = activeSteps.findIndex((s) => s.path === lastSegment);
  
  // If no tab matches (e.g. root path), default to 0
  if (currentStep === -1) currentStep = 0;
  
  const totalSteps = activeSteps.length;

  // -------------------------------------------------------------
  // 4. Handlers
  // -------------------------------------------------------------
  const goBack = () => {
    if (currentStep > 0) {
      // Go to previous step in the active list
      navigate(`${basePath}/${activeSteps[currentStep - 1].path}`);
    } else {
      navigate(-1);
    }
  };

  const handleNextStep = async (step) => {
    try {
      // Step 0: Show success modal
      if (step === 0) {
        setShowSuccess(true);
        return; 
      }
      
      // Last Step: Forward to DO and Redirect
      if (step === totalSteps - 1) {
        window.dispatchEvent(new CustomEvent('notify', { 
            detail: { type: 'success', message: 'Employee forwarded to Divisional Officer successfully!' } 
        }));
        
        // --- REDIRECTION LOGIC ---
        navigate('/scopes/employee/status/onboarding');
        return;
      }

      // Normal Navigation: Go to next step in active list
      navigate(`${basePath}/${activeSteps[currentStep + 1].path}`);
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
          mainTitle={isHR ? "HR Employee Onboarding Management" : "New Employee Onboarding"}
          subHeading={hideSalary ? "" : ""}
        />
      </div>

      {!showSuccess && (
        <div className={styles.navTabsWrapper}>
          {/* NOTE: Ensure EmployeeNavTabOnBoarding accepts the 'steps' prop! 
            <EmployeeNavTabOnBoarding basePath={basePath} steps={activeSteps} />
          */}
          <EmployeeNavTabOnBoarding basePath={basePath} steps={activeSteps} />
        </div>
      )}

      <div className={styles.contentArea}>
        <Routes>
          {/* Redirect root to basic-info */}
          <Route index element={<Navigate to="basic-info" replace />} />
          
          <Route path="basic-info" element={<BasicInfo />} />
          <Route path="address-info" element={<AddressInfoFormNew />} />
          <Route path="family-info" element={<FamilyInfo />} />
          <Route path="previous-employer-info" element={<PreviousEmployerInfo />} />
          <Route path="qualification" element={<QualificationForm />} />
          <Route path="upload-documents" element={<UploadDocumentsForm />} />
          <Route path="category-info" element={<CategoryInfo />} />
          <Route path="bank-info" element={<BankInfo />} />
          <Route path="agreements" element={<AgreementInfoForm />} />
          
          {/* Only render Salary Route if NOT hidden */}
          {!hideSalary && (
             <Route path="salary-info" element={<SalaryInfoForm />} />
          )}
        </Routes>
      </div>

      {!showSuccess && (
        <OnboardingFooter
          currentStep={currentStep}
          totalSteps={totalSteps}
          allSteps={activeSteps}
          role={role}
          onNext={() => handleNextStep(currentStep)}
          onBack={goBack}
          hideSkip={true}
          primaryButtonLabel={
            currentStep === 0 
              ? "Create Temp ID and Proceed" 
              : currentStep === totalSteps - 1 
              ? "Forward To Divisional Officer" 
              : null
          }
        />
      )}

      {showSuccess && (
        <SuccessPage
          mode="modal"
          title="Temp Id Generated Successfully"
          onClose={() => setShowSuccess(false)}
          onProceed={() => {
            setShowSuccess(false);
            // Calculate next path safely using activeSteps
            const nextPath = activeSteps[currentStep + 1]?.path || 'address-info';
            navigate(`${basePath}/${nextPath}`); 
          }}
          proceedLabel="Proceed to Address Info"
        />
      )}
    </div>
  );
};

export default NewEmployeeOnboardingForms;