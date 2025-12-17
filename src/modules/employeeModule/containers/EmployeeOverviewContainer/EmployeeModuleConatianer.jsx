import EmployeeNavtabs from "../../components/EmployeeOverViewScreens/EmployeeNavtabs/Employeenavtabs";
import Styles from "../EmployeeModuleConatiner/EmployeeModuleConatiner.module.css";
import EmployeeProfileContainer from "../ProfileOverViewConatiner/EmployeeProfileConytainer";
const EmployeeOverviewHRContainer = () => {
    return (
        <div className={Styles.container}>
            <EmployeeProfileContainer/>
            <EmployeeNavtabs/>
        </div>
    );
};
export default EmployeeOverviewHRContainer;