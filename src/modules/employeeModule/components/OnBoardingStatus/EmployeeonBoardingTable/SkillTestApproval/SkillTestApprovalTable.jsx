// components/OnBoardingStatus/EmployeeonBoardingTable/SkillTestApproval/SkillTestApprovalTable.js

import React, { useState, useEffect, useMemo } from "react";
import styles from "../OnBoardingStatusTable.module.css";
import rightarrow from "assets/onboarding_status_table/rightarrow.svg";
import uparrow from "assets/onboarding_status_table/uparrow.svg";
import downarrow from "assets/onboarding_status_table/downarrow.svg";

// This table is for the "Skill Test Approval" tab
const SkillTestApprovalTable = ({ selectedStatus, role, onEmployeeSelect }) => {
    const [pageIndex, setPageIndex] = useState(0);

    // --- Mock Data for this table (different statuses) ---
    const employeeTemplates = [
        {
            name: "Ravi", empNo: "HYD100001", tempPayroll: "TEMP10001",
            joinDate: "28 June 2025", city: "Hyderabad",
            campus: "Miyapur Girls Res.", gender: "Male",
            status: "Conformed",
        },
        {
            name: "Priya", empNo: "HYD100002", tempPayroll: "TEMP10002",
            joinDate: "14 March 2023", city: "Hyderabad",
            campus: "Miyapur Girls Res.", gender: "Female",
            status: "Left",
        },
    ];

    // (Data fetching and filtering logic)
    const data = Array.from({ length: 20 }, (_, i) => ({
        ...employeeTemplates[i % 2],
    }));
    let filteredData = data;
    if (selectedStatus && selectedStatus !== "All") {
        filteredData = data.filter((row) => row.status === selectedStatus);
    }

    // (Pagination logic is fine)
    const pageSize = 10;
    const total = filteredData.length;
    const totalPages = Math.max(Math.ceil(total / pageSize), 1);
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const pagedData = filteredData.slice(start, end);
    const prevDisabled = pageIndex === 0;
    const nextDisabled = pageIndex + 1 >= totalPages;


    // === Column logic for *this table only* ===
    const columns = useMemo(() => {
        return [
            "EMPLOYEE NAME",
            "EMPLOYEE NUMBER",
            "TEMP PAYROLL",
            "JOIN DATE",
            "CITY",
            "CAMPUS",
            "GENDER",
            "STATUS",];
    }, []);

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

                    {/* === Body rendering for *this table only* === */}
                    <tbody>
                        {pagedData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.empNo}</td>
                                <td>{row.tempPayroll}</td>
                                <td>{row.joinDate}</td>
                                <td>{row.city}</td>
                                <td>{row.campus}</td>
                                <td>{row.gender}</td>

                                {/* Status Cell */}
                                <td>
                                    <span
                                        className={`${styles.statusBadge} ${row.status === "Conformed" ? styles.statusCompleted :
                                            row.status === "Left" ? styles.statusIncomplete :
                                                styles.statusPending
                                            }`}
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
                                        // This calls the prop, and the layout wrapper adds the 'skillTest' type.
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

export default SkillTestApprovalTable;