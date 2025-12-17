import React from "react";
import { Routes, Route } from "react-router-dom";
import GenericNavTabs from "widgets/NavTabs/GenericNavTabs"; 
import Styles from "./EmployeeNavtabs.module.css";
import EmployeModule from "../EmployeeModule/EmployeeModule";
import FamilyInfo from "../../../containers/FamilyAddressInfoMainContainer/FAmilyAddressInfoContainer";
import EmployeeQualificationDetailsContainer from "../../../containers/EmployeeQualificationDetails/EmployeeQualificationDetailsContainer";
import EmployeeDocumentsContainer from "../../../components/EmployeeOverViewScreens/EmpDocuments/EmpDocuments";
import BankDetailsContainer from "../../../containers/BankDetailsContainer/BankDetailsConatiner"
import AgreementsDetails from "../../../containers/AgreementsConatiner/AgreementsDetailsContainer";

const EmployeeNavtabs = () => {
  const tabs = [
    { id: 1, label: "Basic Info", path: "/scopes/employee/hr/overview/basic-info" },
    { id: 2, label: "Family & Address Info", path: "/scopes/employee/hr/overview/family-info" },
    { id: 3, label: "Qualification Details", path: "/scopes/employee/hr/overview/qualificationDetails" },
    { id: 4, label: "Documents", path: "/scopes/employee/hr/overview/documents" },
    { id: 5, label: "Bank Details", path: "/scopes/employee/hr/overview/bank-details" },
    { id: 6, label: "Agreements", path: "/scopes/employee/hr/overview/agreements" },
  ];

  return (
    <div className={Styles.container}>
      <GenericNavTabs tabs={tabs} />

      <Routes>
        <Route path="basic-info" element={<EmployeModule />} />
        <Route path="family-info" element={<FamilyInfo />} />
        <Route path="qualificationDetails/*" element={<EmployeeQualificationDetailsContainer />} />
        <Route path="documents/*" element={<EmployeeDocumentsContainer />} />
        <Route path="agreements" element={<AgreementsDetails  />} />

        {/* Optional placeholder for Bank Details */}
        <Route path="bank-details" element={<BankDetailsContainer/>} />
      </Routes>
    </div>
  );
};

export default EmployeeNavtabs;
