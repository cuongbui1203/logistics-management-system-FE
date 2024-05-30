import { cookies } from 'next/headers';
import TransactionDetail from '@/components/dashboard/work-plate/workPlate-detail';
import { workPlateApiRequest } from '@/api/workplate';
import { addressApiRequest } from '@/api/address';
import { WorkPlateEnumType } from '@/config/Enum';
import { WorkPlateSchemaType } from '@/schema/common.schema';

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const data = await workPlateApiRequest.getDetailWorkPlate(token?.value || '', id);
  const workPlate: WorkPlateSchemaType = data.payload.data;

  const listProvince = await addressApiRequest.getProvince();
  const listProvinceOption = listProvince.payload.data.map((item) => ({
    label: item.full_name,
    value: item.code,
  }));

  return (
    <TransactionDetail workPlate={workPlate} listProvince={listProvinceOption} type={WorkPlateEnumType.Transaction} />
  );
}
