import { addressApiRequest } from '@/api/address';
import EmployeeForm from '@/app/dashboard/employee/create/employee-form';

export default async function Page() {
  const listProvince = await addressApiRequest.getProvince();
  return <EmployeeForm listProvince={listProvince.payload.data} />;
}
