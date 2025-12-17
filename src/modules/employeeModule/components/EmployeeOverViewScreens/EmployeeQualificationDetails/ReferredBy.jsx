import React from "react";
import Accordian from 'widgets/accordian-component/Accordian'; 
import leftDividerIcon from 'assets/RightSideInformation Icons/left_divider_icon.svg';
import rightDividerIcon from 'assets/RightSideInformation Icons/right_divider_icon.svg';
import profileIcon from 'assets/RightSideInformation Icons/circle icon.svg'; 
import EmployeeDetailsCard from 'widgets/EmployeeDetailsCard/EmployeeDetailsCard';
import styles from "../EmployeeQualificationDetails/ReferredBy.module.css";

const ReferredBy = ({ expanded, onChange }) => {
  return (
    <div >
      <Accordian
        zoneTitle="Referred By"
        expanded={expanded}
        onChange={onChange}
      >
        <div className={styles.EmployeeDetailsCard}>
            <EmployeeDetailsCard
            name="Venkateswarao Boppana"
            emp_id="EMP ID: HYD 09817298"
            profileIcon={profileIcon}
            titleLable="Manager Name"
            leftDividerIcon={leftDividerIcon}
            rightDividerIcon={rightDividerIcon}
            role="Vice President"
            dividerColor="#3425ff"
            phoneNumber="+91 9876543210"
            email="venkat@example.com"
          />
          </div>
      </Accordian>
    </div>
  );
};

export default ReferredBy;
