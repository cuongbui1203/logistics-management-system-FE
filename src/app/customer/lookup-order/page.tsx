'use client';
import LookUpBanner from '@/components/customer/lookup-banner';
import LookUpOrder from '@/components/customer/lookup-order';
import { useState } from 'react';

export default function Order({ searchParams }: { searchParams: { query: string } }) {
  const currentQuery = searchParams.query || '';
  const [searched, isSearch] = useState(false);

  return (
    <div>
      <LookUpBanner title={'TRA CỨU ĐƠN HÀNG'} />
      <LookUpOrder />
    </div>
  );
}
