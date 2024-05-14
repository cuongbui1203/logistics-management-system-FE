'use client';
import { addressApiRequest } from '@/api/address';
import LookUpBanner from '@/components/customer/lookup-banner';
import LookUpTransaction from '@/components/customer/lookup-transaction';

export default async function Transaction() {
  const listProvince = await addressApiRequest.getProvince();

  return (
    <div>
      <LookUpBanner title={'TRA CỨU BƯU CỤC'} />
      <LookUpTransaction listProvince={listProvince.payload.data} />
    </div>
  );
}
