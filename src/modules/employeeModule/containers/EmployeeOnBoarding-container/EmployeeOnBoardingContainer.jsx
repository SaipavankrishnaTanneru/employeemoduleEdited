// containers/EmployeeOnBoarding-container/EmployeeOnBoardingContainer.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import EmployeeLanding from '../../components/EmployeeLandingPage/EmployeeLanding';
import OnboardNewEmployeePage from '../../components/EmployeeOnBoardingForms/OnboardNewEmployeePage/OnboardNewEmployeePage';
import EmployeeModuleContainer from '../EmployeeModuleConatiner/EmployeeModuleConatianer';
import NewEmployeeOnboardingForms from '../EmployeeFormsConatiner/EmployeeFormsContainer';
import ManagerMappingContainer from '../ManagerMappingContainer/ManagerMappingContainer';

const EmployeeOnBoardingContainer = () => {
  return (
    <Routes>

      {/* 1. Employee Landing Page */}
      <Route path="/" element={<EmployeeLanding />} />

      {/* 2. Teach Skill Test Route */}
      {/* URL: /scopes/employee/start */}
      <Route path="/start" element={<OnboardNewEmployeePage />} />

      {/* 3. Non-Teach Multi-Step Forms */}
      {/* URL: /scopes/employee/form/basic-info etc */}
      <Route path="/form/*" element={<NewEmployeeOnboardingForms />} />
      {/* URL: /scopes/employee/status */}
      <Route path="/status/*" element={<EmployeeModuleContainer />} />

       <Route path="/employeeManager/*" element={<ManagerMappingContainer />} />

    </Routes>
  );
};

export default EmployeeOnBoardingContainer;
