import { cookies } from 'next/headers';
import TransshipmentDetail from '@/components/dashboard/work-plate/workPlate-detail';
import { workPlateApiRequest } from '@/api/workplate';
import { addressApiRequest } from '@/api/address';
import { WorkPlateResType } from '@/schema/workplate.schema';
import { WorkPlateEnumType } from '@/config/Enum';

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const data = await workPlateApiRequest.getDetailWorkPlate(token?.value || '', id);
  const workPlate: WorkPlateResType = data.payload.data;

  const listProvince = await addressApiRequest.getProvince();

  return (
    <TransshipmentDetail
      workPlate={workPlate}
      listProvince={listProvince.payload.data}
      type={WorkPlateEnumType.Transshipment}
    />
  );
}
