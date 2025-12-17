import React, { useState } from "react";

import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import OnBoardingEmployeeNav from "../../components/OnBoardingStatus/OnBoardingEmployeeNav/OnBoardingEmployeeNav";
import AddSalaryDetails from "../../components/OnBoardingStatus/EmployeeNavOverview/AddSalaryDetails";
import EmployeeChecklist from "../../components/OnBoardingStatus/DOChecklist/EmployeeChecklist";

import EmployeeProfileContainer from "../EmployeeProfileContainer/EmployeeProfileConytainer";

import OnBoardingStatusLayout from "../../components/OnBoardingStatus/EmployeeonBoardingTable/OnBoardingStatusLayout";
import SkillTestApprovalHeader from "../../components/SkillTestProfileCard/SkillTestApprovalHeader";

import Styles from "./EmployeeModuleConatiner.module.css";

const EmployeeModuleContainer = ({ role }) => {
  const [currentView, setCurrentView] = useState("table");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [fromSkillTest, setFromSkillTest] = useState(false);
  const [lastOnboardingStep, setLastOnboardingStep] = useState(0);

  // Role logic
  const isDO = role === "DO";
  const totalSteps = isDO ? 3 : 2;

  // Clicking a row in any table
  const handleEmployeeSelect = (employee, isSkillTest = false) => {
    setSelectedEmployee(employee);
    setFromSkillTest(isSkillTest);

    if (isSkillTest) {
      setCurrentView("skillTestApproval");
    } else {
      setCurrentView("onboarding");
    }
  };

  const handleFinishOnboarding = (lastStepIndex) => {
    setLastOnboardingStep(lastStepIndex);
    if (isDO) setCurrentView("salary");
    else setCurrentView("checklist");
  };

  const handleSalarySubmitComplete = () => {
    setCurrentView("checklist");
  };

  const handleBackToTable = () => {
    setCurrentView("table");
    setFromSkillTest(false);
  };

  const handleBackToOnboarding = () => setCurrentView("onboarding");
  const handleBackToSalary = () => setCurrentView("salary");

  const checklistOnBack = isDO ? handleBackToSalary : handleBackToOnboarding;

  // Subheading for each view
  const getSubHeading = () => {
    if (currentView === "skillTestApproval") return "Skill Test Approval";
    if (currentView === "salary") return "Add Salary Details";
    if (currentView === "checklist") return "CheckList";
    if (currentView === "onboarding") return "Employee Preview";
    return "Employee Preview";
  };

  // Step indicator
  const getCurrentStep = () => {
    if (currentView === "skillTestApproval") return 0;
    if (currentView === "onboarding") return 1;
    if (currentView === "salary") return 2;
    if (currentView === "checklist") return isDO ? 3 : 2;
    return 0;
  };

  // --- TABLE VIEW ---
  if (currentView === "table") {
    return (
      <div className={Styles.widthpptable}>
        <OnBoardingStatusLayout
          role={role}
          onEmployeeSelect={(emp) =>
            handleEmployeeSelect(
              emp,
              emp?.status === "Conformed" || emp?.skillTest === true
            )
          }
        />
      </div>
    );
  }

  // --- OTHER VIEWS ---
  return (
    <div className={Styles.widthpp}>
      <div className={Styles.moduleWrapper}>
        
        {/* HEADER */}
        {currentView === "skillTestApproval" ? (
          <SkillTestApprovalHeader onBack={handleBackToTable} />
        ) : (
          <EmployeeOnboardingHeader
            step={getCurrentStep()}
            totalSteps={totalSteps}
            subHeading={getSubHeading()}
            onBack={
              currentView === "onboarding"
                ? handleBackToTable
                : currentView === "salary"
                ? handleBackToOnboarding
                : checklistOnBack
            }
          />
        )}

        <div className={Styles.mainContainer}>

          {/* LEFT SIDE: PROFILE – HIDE DURING SKILL TEST APPROVAL */}
          {currentView !== "skillTestApproval" && (
            <EmployeeProfileContainer employee={selectedEmployee} />
          )}

          {/* RIGHT SIDE CONTENT */}
          <div className={Styles.navSection}>
            
            {/* SKILL TEST APPROVAL CONTENT */}
            {currentView === "skillTestApproval" && (
              <div style={{ padding: "20px" }}>
                
              </div>
            )}

            {/* ONBOARDING FLOW */}
            {currentView === "onboarding" && (
              <OnBoardingEmployeeNav
                onFinish={handleFinishOnboarding}
                role={role}
                initialStep={lastOnboardingStep}
                onBack={handleBackToTable}
              />
            )}

            {/* SALARY STEP (DO only) */}
            {currentView === "salary" && isDO && (
              <AddSalaryDetails
                onBack={handleBackToOnboarding}
                onSubmitComplete={handleSalarySubmitComplete}
              />
            )}

            {/* CHECKLIST STEP */}
            {currentView === "checklist" && (
              <EmployeeChecklist onBack={checklistOnBack} role={role} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModuleContainer;
