import { addressApiRequest } from '@/api/address';
import TransactionForm from './transaction-form';

export default async function CreateTransaction() {
  const listProvince = await addressApiRequest.getProvinceClient();
  return <TransactionForm listProvince={listProvince.payload.data} />;
}
