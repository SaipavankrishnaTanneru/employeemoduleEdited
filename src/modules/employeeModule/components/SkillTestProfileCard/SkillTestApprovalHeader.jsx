// components/SkillTestApprovalHeader/SkillTestApprovalHeader.js
import React from "react";
import styles from "./SkillTestApprovalHeader.module.css";

// You might need to adjust the path based on its location
import backArrowIcon from 'assets/onboarding_status_table/leftarrow.svg';
import SkillTestApprovalContainer from "../../containers/SkillTestProfileContainer/SkillTestProfileContainer";
import FooterWidget from 'widgets/ChecklistFooterWidget/Checklistfooter';
import leftarrow from 'assets/EmployeeOnBoarding/leftarrow';
import Approve from 'assets/EmployeeOnBoarding/Approve';
import rejecticon from 'assets/EmployeeOnBoarding/rejecticon.svg';

const SkillTestApprovalHeader = ({ onBack }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <button
          className={styles.backButton}
          onClick={onBack}
          aria-label="Go back"
        >
          {/* Using a simple image tag for the back arrow for clarity */}
          <img src={backArrowIcon} alt="Back Arrow" className={styles.backIcon} />
        </button>

        {/* The fixed title for this specific page */}
        <h2 className={styles.title}>Professional Skill Test Approval</h2>
      </div>
      <SkillTestApprovalContainer />
      <FooterWidget
        backLabel="Back"
        forwardLabel="Approve"
        rejectLabel="Reject"

        backIcon={leftarrow}
        forwardIcon={Approve}
        rejectIcon={rejecticon}

        backWidth="120px"
        forwardWidth="141px"

        onBack={() => { }}
        onForward={() => { }}
        onReject={() => {}}
      />
    </div> 
  );
};

export default SkillTestApprovalHeader;