import { addressApiRequest } from '@/api/address';
import EmployeeForm from '@/app/dashboard/employee/create/employee-form';

export default async function Page() {
  const listProvince = await addressApiRequest.getProvince();
  const listProvinceOptions = listProvince.payload.data.map((province) => {
    return {
      value: province.code,
      label: province.full_name,
    };
  });
  return <EmployeeForm listProvince={listProvinceOptions} />;
}
