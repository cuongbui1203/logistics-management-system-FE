'use client';
import LookUpBanner from '@/components/customer/lookup-banner';
import LookUpTransaction from '@/components/customer/lookup-transaction';

export default function Transaction() {
  return (
    <div>
      <LookUpBanner title={'TRA CỨU BƯU CỤC'} />
      <LookUpTransaction />
    </div>
  );
}
