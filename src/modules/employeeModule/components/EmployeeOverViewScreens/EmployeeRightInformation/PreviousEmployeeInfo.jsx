import React from 'react';
import Accordian from 'widgets/accordian-component/Accordian';
import styles from "../EmployeeRightInformation/PreviousEmployeeInfo.module.css";
import callIcon from "assets/RightSideInformation Icons/phoneicon.svg";
import mailIcon from "assets/RightSideInformation Icons/smsicon.svg";
import cicleIcon from "assets/RightSideInformation Icons/circle icon.svg";


const PreviousEmployeeInfo = ({ expanded, onChange }) => {
  return (
    <div>
      <Accordian
        zoneTitle="Previous Employee Info"
        expanded={expanded}
        onChange={onChange}
      >

        <div className={styles.employeeInfoContent}>
          <div>
            <p className={styles.employeelabel}>Employer Name</p>
            <p className={styles.employeedetails}>Brown Stone Corporation Limited</p>
          </div>
          <div>
            <p className={styles.employeelabel}>Location</p>
            <p className={styles.employeedetails}>Hyderabad</p>
          </div>

          <div className={styles.employeeInfo}>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Designation</p>
              <p className={styles.employeedetails}>IT</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Role</p>
              <p className={styles.employeedetails}>Software Trainee</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>CTC</p>
              <p className={styles.employeedetails}>XXX</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>From</p>
              <p className={styles.employeedetails}>10 Jan 2016</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>To</p>
              <p className={styles.employeedetails}>16 Apr 2020</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Leaving Reason</p>
              <p className={styles.employeedetails}>Due to Medical</p>
            </div>
            <div className={styles.item}>
              <p className={styles.employeelabel}>Nature Of Duty</p>
              <p className={styles.employeedetails}>Full Time Employee</p>
            </div>
          </div>
          <hr className={styles.divider} />
        </div>
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
      </Accordian>
    </div>
  );
};

export default PreviousEmployeeInfo;
