import { addressApiRequest } from '@/api/address';
import OrderStepper from './order-stepper';

export default async function Page() {
  const listProvince = await addressApiRequest.getProvince();
  const listProvinceOptions = listProvince.payload.data.map((province) => {
    return {
      value: province.code,
      label: province.full_name,
    };
  });
  return <OrderStepper listProvince={listProvinceOptions} />;
}
