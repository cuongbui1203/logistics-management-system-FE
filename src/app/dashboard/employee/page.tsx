import { CreateEmployee } from '@/components/button';
import EmployeeTable from '@/components/dashboard/table/employee-table';

interface EmployeePageProps {
  searchParams: {
    page?: number;
  };
}

export default function EmployeePage({ searchParams }: EmployeePageProps) {
  const currentPage = searchParams.page || 1;

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
        <EmployeeTable page={currentPage} showFilter={true}></EmployeeTable>
      </div>
    </div>
  );
}
