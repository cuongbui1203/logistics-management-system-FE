import { cookies } from 'next/headers';
import EmployeeInformation from './employee-detail';
import { UserSchemaType } from '@/schema/common.schema';
import accountApiRequest from '@/api/account';
import { addressApiRequest } from '@/api/address';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const data = await accountApiRequest.getInfo(token?.value || '', id);
  const user: UserSchemaType = data.payload.data;

  const listProvince = await addressApiRequest.getProvince();
  const listDistrict = await addressApiRequest.getDistrict(user.address.provinceCode);
  const listWard = await addressApiRequest.getWard(user.address.districtCode);

  return (
    <EmployeeInformation
      employee={user}
      listProvince={listProvince.payload.data}
      listDistrict_1={listDistrict.payload.data}
      listWard_1={listWard.payload.data}
    />
  );
}
