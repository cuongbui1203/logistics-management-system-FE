import { addressApiRequest } from '@/api/address';
import TransactionForm from '@/components/dashboard/work-plate/workPlate-form';
import { WorkPlateEnumType } from '@/config/Enum';

export default async function CreateTransaction() {
  const listProvince = await addressApiRequest.getProvince();
  return <TransactionForm listProvince={listProvince.payload.data} type={WorkPlateEnumType.Transaction} />;
}
