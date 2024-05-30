import { addressApiRequest } from '@/api/address';
import TransactionForm from '@/components/dashboard/work-plate/workPlate-form';
import { WorkPlateEnumType } from '@/config/Enum';

export default async function CreateTransaction() {
  const listProvince = await addressApiRequest.getProvince();
  const listProvinceOption = listProvince.payload.data.map((item) => ({
    label: item.full_name,
    value: item.code,
  }));
  return <TransactionForm listProvince={listProvinceOption} type={WorkPlateEnumType.Transaction} />;
}
