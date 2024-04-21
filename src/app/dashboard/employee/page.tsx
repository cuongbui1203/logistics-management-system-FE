'use client';
import { useAppContext } from '@/app/app-provider';
import { CreateEmployee } from '@/components/dashboard/button';
import EmployeeTable from '@/components/dashboard/table/employee-table';
import { UserRole } from '@/config/Enum';

interface EmployeePageProps {
  searchParams: {
    name?: string;
    phone?: string;
    emID?: string;
    status?: string;
    address?: string;
    page?: number;
  };
}

export default function EmployeePage({ searchParams }: EmployeePageProps) {
  const query = {
    name: searchParams.name,
    emID: searchParams.emID,
    phone: searchParams.phone,
    address: searchParams.address,
    status: searchParams.status,
  };
  const { user } = useAppContext();
  const role = user?.role.name;
  const currentPage = searchParams.page || 1;

  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          {role == UserRole.Manager || <h3>Danh sách nhân viên</h3>}
          {/* {role == UserRole.Admin && <h3>Danh sách trưởng điểm</h3>} */}
        </div>

        <div className="col btnContainer">
          <CreateEmployee />
        </div>
      </div>

      <div className="row">
        <EmployeeTable page={currentPage} query={query} showFilter={false}></EmployeeTable>
      </div>
    </div>
  );
}
