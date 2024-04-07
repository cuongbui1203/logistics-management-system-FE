'use client';
import EstimateCost from '@/components/customer/estimate-cost';
import LookUpBanner from '@/components/customer/lookup-banner';

export default function Cost() {
  return (
    <div>
      <LookUpBanner title={'ƯỚC TÍNH CƯỚC PHÍ'} />
      <EstimateCost />
    </div>
  );
}
