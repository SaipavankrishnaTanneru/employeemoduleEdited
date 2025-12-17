import styles from "./QualificationLeftSide.module.css";
import GenericNavTabs from 'widgets/NavTabs/GenericNavTabs';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import EmpBachelorsInfo from "./Bachelors/EmpBachelorsInfo";
import EmpIntermediateInfo from "./Intermediate/EmpIntermediateInfo";
import EmpSchoolInfo from "./School/EmpSchoolInfo";
import { useEffect, useMemo } from "react";
import tab_icon from "assets/EmployeeQu/tab_icon.svg";

const QualificationLeftSide = () => {
  const qualificationTabs = useMemo(() => [
    {
      id: "bachelors",
      label: "Bachelors",
      path: "/scopes/employee/hr/overview/qualificationDetails/bachelors",
    },
    {
      id: "intermediate",
      label: "Intermediate",
      path: "/scopes/employee/hr/overview/qualificationDetails/intermediate",
    },
    { id: "school", label: "10Th Class", path: "/scopes/employee/hr/overview/qualificationDetails/school" },
  ], []); // Empty dependency array ensures it's only created once

  const firstTabPath = qualificationTabs[0].path;

  const location = useLocation();
  const navigate = useNavigate();

  const basePath = firstTabPath.substring(0, firstTabPath.lastIndexOf('/'));

 useEffect(() => {
    // Check if the current pathname is EXACTLY the base path (e.g., /qualificationDetails)
    // OR if the current path is just the parent route (e.g., /qualificationDetails/)
    if (location.pathname === basePath || location.pathname === basePath + '/') {
      navigate(firstTabPath, { replace: true });
    }
    
    // The dependency array is now clean: only includes necessary values 
    // that change when the route or navigation changes.
  }, [location.pathname, navigate, firstTabPath, basePath]);

  return (
    <>
      <div className={styles.qualificationLeftTop}>
        <div className={styles.qualificationIconHeading}>
          <figure>
            <img src={tab_icon} alt="tab_icon" />
          </figure>
          <div className={styles.qualificationTabHeading}>
            <p className={styles.heading}>Qualification Details</p>
            <p className={styles.description}>
              Get All The Analytics And Growth Rate of Applications
            </p>
          </div>
        </div>
      </div>
      <div className={styles.qualificationNavTabNContent}>
        <div className={styles.qualificationNavTabs}>
          <GenericNavTabs tabs={qualificationTabs} />
        </div>
        <Routes>
            <Route index element={<EmpBachelorsInfo />} />
            <Route path="/bachelors" element={<EmpBachelorsInfo />} />
            <Route path="/intermediate" element={<EmpIntermediateInfo />} />
            <Route path="/school" element={<EmpSchoolInfo />} />
          </Routes>
      </div>
    </>
  );
};

export default QualificationLeftSide;
