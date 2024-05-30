import { addressApiRequest } from '@/api/address';
import TransshipmentForm from '@/components/dashboard/work-plate/workPlate-form';
import { WorkPlateEnumType } from '@/config/Enum';
export default async function CreateTransshipment() {
  const listProvince = await addressApiRequest.getProvince();
  const listProvinceOption = listProvince.payload.data.map((item) => ({
    label: item.full_name,
    value: item.code,
  }));
  return <TransshipmentForm listProvince={listProvinceOption} type={WorkPlateEnumType.Transshipment} />;
}
