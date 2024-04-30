import { cookies } from 'next/headers';
import TransactionDetail from './transaction-detail';
import { workPlateApiRequest } from '@/api/workplate';
import { addressApiRequest } from '@/api/address';
import { WorkPlateResType } from '@/schema/workplate.schema';

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const data = await workPlateApiRequest.getDetailWorkPlate(token?.value || '', id);
  const workPlate: WorkPlateResType = data.payload.data;

  const listProvince = await addressApiRequest.getProvince();
  const listDistrict = await addressApiRequest.getDistrict(workPlate.address.provinceCode);
  const listWard = await addressApiRequest.getWard(workPlate.address.districtCode);

  return (
    <TransactionDetail
      workPlate={data.payload.data}
      listProvince={listProvince.payload.data}
      listDistrict_1={listDistrict.payload.data}
      listWard_1={listWard.payload.data}
    />
  );
}
