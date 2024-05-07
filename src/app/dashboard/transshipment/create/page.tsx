import { addressApiRequest } from '@/api/address';
import TransactionForm from '../../transaction/create/transaction-form';

export default async function CreateTransshipment() {
  const listProvince = await addressApiRequest.getProvince();
  return <TransactionForm listProvince={listProvince.payload.data} />;
}
