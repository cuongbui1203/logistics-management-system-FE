'use client';

import MainInformation from '@/components/dashboard/information/mainInfo';
import Security from '@/components/dashboard/information/security';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import React, { useState } from 'react';

export default function InformationClient({ listProvince }: { listProvince: AddressDetailSchemaType[] }) {
  const [isSecurityTab, setSecurityTab] = useState(false);

  return (
    <>
      <div>
        <button
          type="button"
          className={`btn btn-outline-primary ${!isSecurityTab ? 'active' : ''}`}
          onClick={() => setSecurityTab(false)}
        >
          Thông tin
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ms-2 ${isSecurityTab ? 'active' : ''}`}
          onClick={() => setSecurityTab(true)}
        >
          Bảo mật
        </button>
      </div>
      <div className="row mt-3">
        {!isSecurityTab && <MainInformation listProvince={listProvince} />}
        {isSecurityTab && <Security />}
      </div>
    </>
  );
}
