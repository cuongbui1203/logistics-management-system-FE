import { addressApiRequest } from '@/api/address';
import TransshipmentForm from '@/components/dashboard/work-plate/workPlate-form';
import { WorkPlateEnumType } from '@/config/Enum';
export default async function CreateTransshipment() {
  const listProvince = await addressApiRequest.getProvince();
  return <TransshipmentForm listProvince={listProvince.payload.data} type={WorkPlateEnumType.Transshipment} />;
}
