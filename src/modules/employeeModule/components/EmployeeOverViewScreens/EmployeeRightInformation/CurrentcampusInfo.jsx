import React from 'react';
import Accordian from 'widgets/accordian-component/Accordian';
import styles from "../EmployeeRightInformation/CurrentCampusinfo.module.css";
import  leftDividerIcon from "assets/RightSideInformation Icons/left_divider_icon.svg";
import  rightDividerIcon from "assets/RightSideInformation Icons/right_divider_icon.svg";
import profileIcon from "assets/RightSideInformation Icons/circle icon.svg"; 
import EmployeeDetailsCard from 'widgets/EmployeeDetailsCard/EmployeeDetailsCard';
import callIcon from "assets/RightSideInformation Icons/phoneicon.svg";
import mailIcon from "assets/RightSideInformation Icons/smsicon.svg";
import cicleIcon from "assets/RightSideInformation Icons/circle icon.svg";

const CurrentcampusInfo = ({ expanded, onChange }) => {
  return (
    <div>

      <Accordian zoneTitle="Current Campus Info"
        expanded={expanded}
        onChange={onChange} >



        <div className={styles.employeeInfoContent}>
          <div>
            <p className={styles.employeelabel}>Campus Name</p>
            <p className={styles.employeedetails}>RankGuru Technologies Limited</p>
          </div>

          <div className={styles.employeeInfo}>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Campus Code</p>
              <p className={styles.employeedetails}>Hyderabad</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Campus Type</p>
              <p className={styles.employeedetails}>IT</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Building</p>
              <p className={styles.employeedetails}>Software Trainee</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Work Mode</p>
              <p className={styles.employeedetails}>Full Time</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Joining As</p>
              <p className={styles.employeedetails}>Replacement</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Replacement Employee</p>
              <p className={styles.employeedetails}>Srinivasarao pande</p>
            </div>
          </div>
          <hr className={styles.divider} />

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

          <div className={styles.campusInfoConatiner}>
           <div className={styles.addressContainer}>
          {/* Left icon */}
          <div className={styles.lefticon}>
            <img src={cicleIcon} alt="Office Icon" />
          </div>

          {/* Address details */}
          <div className={styles.addressDetails}>
            <p className={styles.addressTitle}>Address</p>
            <p className={styles.companyname}>Rank Guru Technologies</p>
            <p className={styles.fullAddress}>
              Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081
            </p>
          </div>

          {/* Right icons */}
          <div className={styles.rightIcons}>
            <img src={callIcon} alt="Call" />
            <img src={mailIcon} alt="Mail" />
          </div>
        </div>

          </div>
        </div>
      </Accordian>
    </div>
  );
}
export default CurrentcampusInfo;
