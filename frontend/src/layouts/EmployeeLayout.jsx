import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeTopbar from "../components/employee/EmployeeTopbar";

import "./EmployeeLayout.css";

function EmployeeLayout({ children }) {
  return (
    <div className="employee-layout">
      <EmployeeSidebar />

      <div className="employee-main">
        <EmployeeTopbar />

        <main className="employee-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default EmployeeLayout;