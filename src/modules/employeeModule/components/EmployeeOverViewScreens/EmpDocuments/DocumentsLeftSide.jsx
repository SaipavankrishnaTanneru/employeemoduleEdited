import styles from "./DocumentsLeftSide.module.css";
import GenericNavTabs from 'widgets/NavTabs/GenericNavTabs';
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import tab_icon from 'assets/EmployeeQu/tab_icon.svg';

import FilledForms from "./Filled Forms/FilledForms";
import IdProofs from "./Id Proofs/IdProofs";
import SubmittedDocuments from "./SubmittedDocuments/SubmittedDocuments";

const DocumentsLeftSide = () => {
  const documentsNavTabs = useMemo(
    () => [
      { id: "submittedDocuments", label: "Submitted Documents", path: "/scopes/employee/hr/overview/documents/submittedDocuments" },
      { id: "filledForms", label: "Filled Forms", path: "/scopes/employee/hr/overview/documents/filledForms" },
      { id: "idProofs", label: "ID Proofs", path: "/scopes/employee/hr/overview/documents/idProofs" },
    ],
    []
  );

  const location = useLocation();
  const navigate = useNavigate();

  const firstTabPath = documentsNavTabs[0].path;

  useEffect(() => {
    const isAnyTabActive = documentsNavTabs.some((tab) =>
      location.pathname.includes(tab.path)
    );

    if (!isAnyTabActive) {
      navigate(firstTabPath, { replace: true });
    }
  }, [location.pathname, navigate, documentsNavTabs, firstTabPath]);

  return (
    <>
      <div className={styles.documentsLeftTop}>
        <div className={styles.documentsIconHeading}>
          <figure>
            <img src={tab_icon} alt="tab_icon" />
          </figure>
          <div className={styles.documentsTabHeading}>
            <p className={styles.heading}>Employee Documents</p>
            <p className={styles.description}>
              Manage all employee documents & forms
            </p>
          </div>
        </div>
      </div>

      <div className={styles.documentsNavTabNContent}>
        <div className={styles.documentsNavTabs}>
          <GenericNavTabs tabs={documentsNavTabs} />
        </div>

        {/* Nested Routes */}
        <Routes>
          <Route index element={<SubmittedDocuments />} />
          <Route path="submittedDocuments" element={<SubmittedDocuments />} />
          <Route path="filledForms" element={<FilledForms />} />
          <Route path="idProofs" element={<IdProofs />} />
        </Routes>
      </div>
    </>
  );
};

export default DocumentsLeftSide;
