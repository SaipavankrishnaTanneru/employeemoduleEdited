import React, { useState, useMemo, useEffect } from "react";
import styles from "./OnBoardingStatusLayout.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import leftarrow from "assets/onboarding_status_table/leftarrow.svg";
import filtericon from "assets/onboarding_status_table/filtericon.svg";
import plusIcon from "assets/onboarding_status_table/PlusIconForOnboardNewEmployee.svg";

import SearchBox from "widgets/Searchbox/Searchbox";
import { searchicon } from "assets/onboarding_status_table/searchicon";

import OnBoardingStatusTable from "./OnBoardingStatusTable";
import SkillTestApprovalTable from "../EmployeeonBoardingTable/SkillTestApproval/SkillTestApprovalTable";

import Button from "widgets/Button/Button";
import GenericNavTabs from "widgets/NavTabs/GenericNavTabs";
import StatusFilterPopup from "../../OnBoardingStatus/EmployeeonBoardingTable/StatusFilterPopup/StatusFilterPopup";

const OnBoardingStatusLayout = ({ role, onEmployeeSelect }) => {
  /* ---------------- Role-based filter ---------------- */
  const { filterOptions } = useMemo(() => {
    return {
      filterOptions: [
        "Completed",
        "Incomplete",
        "Pending With CO",
        "Pending With DO",
        "Skill Test Approval",
        "Skill Test Approved",
        "Rejected",
        "Left",
      ],
    };
  }, [role]);

  /* ---------------- State ---------------- */
  const location = useLocation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  /* ---------------- Base Path ---------------- */
  const getBasePath = () => {
    let basePath = location.pathname;
    const tabSegments = ["/onboarding", "/skillTest"];

    for (const segment of tabSegments) {
      if (basePath.endsWith(segment)) {
        basePath = basePath.slice(0, -segment.length);
        break;
      }
    }
    return basePath;
  };

  const basePath = getBasePath();

  /* ---------------- Default Tab Redirect ---------------- */
  useEffect(() => {
    if (
      location.pathname === basePath ||
      location.pathname === `${basePath}/`
    ) {
      navigate(`${basePath}/onboarding`, { replace: true });
    }
  }, [location.pathname, basePath, navigate]);

  /* ---------------- Active Tab ---------------- */
  const activeTab = location.pathname.endsWith("/skillTest")
    ? "skillTest"
    : "onboarding";

  /* ---------------- Handlers ---------------- */
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowFilter(false);
  };

  const handleClearFilter = () => setSelectedStatus("");
  const handleSearchChange = (value) => setSearchValue(value);
  const handleFilterClose = () => setShowFilter(false);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <figure>
          <img src={leftarrow} alt="Back" className={styles.arrowIcon} />
          <figcaption>Onboarding Status</figcaption>
        </figure>

        <Button
          buttonname="Onboard New Employee"
          lefticon={<img src={plusIcon} alt="Plus" />}
          variant="primary"
          onClick={() => console.log("Onboard New Employee clicked")}
        />
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <GenericNavTabs
          activeTab={activeTab}
          tabs={[
            { id: 1, label: "Onboarding Status", path: `${basePath}/onboarding` },
            { id: 2, label: "Skill Test Approval", path: `${basePath}/skillTest` },
          ]}
        />
      </div>

      {/* Search + Filter */}
      <div className={styles.filterRow}>
        <div>
          {selectedStatus && (
            <div
              className={`${styles.filterBadge} ${
                selectedStatus === "Completed"
                  ? styles.completedBadge
                  : selectedStatus === "Incomplete"
                  ? styles.incompleteBadge
                  : selectedStatus === "Pending With CO"
                  ? styles.pendingWithCOBadge
                  : selectedStatus === "Pending With DO"
                  ? styles.pendingWithDOBadge
                  : selectedStatus.includes("Pending")
                  ? styles.pendingBadge
                  : selectedStatus === "Skill Test Approval"
                  ? styles.skillTestApprovalBadge
                  : selectedStatus === "Skill Test Approved"
                  ? styles.skillTestApprovedBadge
                  : selectedStatus === "Rejected"
                  ? styles.rejectedBadge
                  : selectedStatus === "Left"
                  ? styles.leftBadge
                  : styles.allBadge
              }`}
            >
              <span className={styles.closeIcon} onClick={handleClearFilter}>
                ×
              </span>
              {selectedStatus}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className={styles.searchWrapper}>
            <SearchBox
              searchicon={searchicon}
              placeholder="Search for anything"
              width="320px"
              onValueChange={handleSearchChange}
            />
          </div>

          <figure
            className={styles.filterFigure}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <img src={filtericon} alt="Filter" className={styles.filterIcon} />
            <figcaption>Status</figcaption>
            {selectedStatus && <span className={styles.redDot} />}
          </figure>

          <StatusFilterPopup
            open={showFilter}
            filterOptions={filterOptions}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
            onApply={handleStatusChange}
            onClose={handleFilterClose}
          />
        </div>
      </div>

      {/* Tables */}
      {activeTab === "skillTest" ? (
        <SkillTestApprovalTable
          selectedStatus={selectedStatus}
          role={role}
          onEmployeeSelect={onEmployeeSelect}
        />
      ) : (
        <OnBoardingStatusTable
          selectedStatus={selectedStatus}
          role={role}
          onEmployeeSelect={onEmployeeSelect}
        />
      )}
    </div>
  );
};

export default OnBoardingStatusLayout;
