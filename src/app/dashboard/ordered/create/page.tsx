import { addressApiRequest } from '@/api/address';
import OrderStepper from './order-stepper';

export default async function Page() {
  const listProvince = await addressApiRequest.getProvince();
  return <OrderStepper listProvince={listProvince.payload.data} />;
}
