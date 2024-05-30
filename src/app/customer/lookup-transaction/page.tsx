import { addressApiRequest } from '@/api/address';
import LookUpBanner from '@/components/customer/lookup-banner';
import LookUpTransaction from '@/components/customer/lookup-transaction';

export default async function Transaction() {
  const listProvince = await addressApiRequest.getProvince();
  const listProvinceOptions = listProvince.payload.data.map((item) => ({
    value: item.code,
    label: item.name,
  }));

  return (
    <div>
      <LookUpBanner title={'TRA CỨU BƯU CỤC'} />
      <LookUpTransaction listProvince={listProvinceOptions} />
    </div>
  );
}
