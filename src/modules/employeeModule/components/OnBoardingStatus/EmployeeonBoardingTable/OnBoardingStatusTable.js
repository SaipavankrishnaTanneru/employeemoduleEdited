// components/OnBoardingStatusTable.js (This file is complete)
import React, { useState, useMemo } from "react";
import styles from "./OnBoardingStatusTable.module.css";
import rightarrow from 'assets/onboarding_status_table/rightarrow.svg';
import uparrow from 'assets/onboarding_status_table/uparrow.svg';
import downarrow from 'assets/onboarding_status_table/downarrow.svg';
 
// Note: This component no longer needs 'activeTab'
const OnBoardingStatusTable = ({ selectedStatus, role, onEmployeeSelect }) => {
  const [pageIndex, setPageIndex] = useState(0);
 
  const employeeTemplates = [
    {
      name: "Surya", empNo: "HYD6123871", tempPayroll: "TEMP1978612",
      joinDate: "28 June 2025", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Male", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "New", kycStatus: "Request KYC",
      verifyKyc: "Request KYC", status: "Pending with CO",
    },
    {
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted",
      verifyKyc: "Verified", status: "Pending with DO",
    },
    {
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted",
      verifyKyc: "Verified", status: "Skill Test Approval",
    },
    {
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted",
      verifyKyc: "Verified", status: "Skill Test Approved",
    },
    {
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted",
      verifyKyc: "Verified", status: "Completed",
    },
    {
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted",
      verifyKyc: "Verified", status: "Incomplete",
    },
    {
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted",
      verifyKyc: "Verified", status: "Rejected",
    },
    {
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711",
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad",
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks",
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted",
      verifyKyc: "Verified", status: "Left",
    },
  ];
 
  // Function to get status badge class name
  const getStatusBadgeClass = (status) => {
    if (status === "Completed") return styles.statusCompleted;
    if (status === "Incomplete") return styles.statusIncomplete;
    if (status === "Pending with CO") return styles.statusPendingWithCO;
    if (status === "Pending with DO") return styles.statusPendingWithDO;
    if (status === "Skill Test Approval") return styles.statusSkillTestApproval;
    if (status === "Skill Test Approved") return styles.statusSkillTestApproved;
    if (status === "Rejected") return styles.statusRejected;
    if (status === "Left") return styles.statusLeft;
    return styles.statusDefault;
  };
 
  // Use employeeTemplates directly without looping
  let filteredData = employeeTemplates;
  if (selectedStatus && selectedStatus !== "All") {
    filteredData = employeeTemplates.filter((row) => row.status === selectedStatus);
  }
  const pageSize = 50;
  const total = filteredData.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const pagedData = filteredData.slice(start, end);
  const prevDisabled = pageIndex === 0;
  const nextDisabled = pageIndex + 1 >= totalPages;
 
  // This 'columns' logic is now correct for the "Onboarding" tab
  const columns = useMemo(() => {
    const baseColumns = [
      "EMPLOYEE NAME", "EMPLOYEE NUMBER", "TEMP PAYROLL", "JOIN DATE",
      "LEFT DATE", "CITY", "CAMPUS", "GENDER", "REMARKS",
      "JOINING STATUS", "STATUS",
    ];
    if (role === "CO") {
      const joiningStatusIndex = baseColumns.indexOf("JOINING STATUS");
      if (joiningStatusIndex !== -1) {
        baseColumns.splice(joiningStatusIndex + 1, 0,
          "REJOINER/REPLACEMENT PAYROLL", "KYC STATUS", "VERIFY KYC"
        );
      }
    }
    return baseColumns;
  }, [role]);
 
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={index}>
                  <div className={styles.sortableHeader}>
                    <span>{header}</span>
                    <div className={styles.sortIcons}>
                      <img src={uparrow} alt="Sort Up" className={styles.arrowUp} />
                      <img src={downarrow} alt="Sort Down" className={styles.arrowDown} />
                    </div>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, index) => (
              <tr key={index}>
                {/* Base DO Cells */}
                <td>{row.name}</td>
                <td>{row.empNo}</td>
                <td>{row.tempPayroll}</td>
                <td>{row.joinDate}</td>
                <td>{row.leftDate}</td>
                <td>{row.city}</td>
                <td>{row.campus}</td>
                <td>{row.gender}</td>
                <td>{row.remarks}</td>
                <td>{row.joiningStatus}</td>
 
                {/* Extra CO Cells */}
                {role === "CO" && (
                  <>
                    <td>{row.rejoiner}</td>
                    <td>{row.kycStatus}</td>
                    <td>{row.verifyKyc}</td>
                  </>
                )}
 
                {/* Status Cell */}
                <td>
                  <span
                    className={`${styles.statusBadge} ${getStatusBadgeClass(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
 
                {/* Action Cell */}
                <td>
                  <img
                    src={rightarrow}
                    alt="Arrow"
                    className={styles.arrowIcon}
                    onClick={() => onEmployeeSelect(row)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0px)")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Pagination (No changes) */}
      <div className={styles.pagination}>
        {/* ... (all your pagination code) ... */}
        <span className={styles.paginationText}>
          Showing <strong>{total === 0 ? 0 : start + 1}</strong> to{" "}
          <strong>{Math.min(end, total)}</strong> of <strong>{total}</strong>{" "}
          Entries
        </span>
        <div className={styles.paginationRight}>
          <span className={styles.paginationInfo}>
            Page {total === 0 ? 0 : pageIndex + 1} of {totalPages}
          </span>
          <div className={styles.paginationButtons}>
            <button
              type="button"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={prevDisabled}
              className={`${styles.prevBtn} ${prevDisabled ? styles.btnDisabled : ""
                }`}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() =>
                setPageIndex((prev) =>
                  prev + 1 < totalPages ? prev + 1 : prev
                )
              }
              disabled={nextDisabled}
              className={`${styles.nextBtn} ${nextDisabled ? styles.btnDisabled : ""
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default OnBoardingStatusTable;
 