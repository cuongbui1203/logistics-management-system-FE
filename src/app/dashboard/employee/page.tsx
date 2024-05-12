import { CreateEmployee } from '@/components/button';
import EmployeeTable from '@/components/dashboard/employee/employee-table';

export default function EmployeePage() {
  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          <h3>Danh sách nhân viên</h3>
        </div>

        <div className="col btnContainer">
          <CreateEmployee />
        </div>
      </div>

      <div className="row">
        <EmployeeTable showFilter={true}></EmployeeTable>
      </div>
    </div>
  );
}
