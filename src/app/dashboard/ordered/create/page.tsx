import { addressApiRequest } from '@/api/address';
import OrderForm from './order-form';

export default async function Page() {
  const listProvince = await addressApiRequest.getProvince();
  return <OrderForm listProvince={listProvince.payload.data} />;
}
