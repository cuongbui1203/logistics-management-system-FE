'use client';

import { addressApiRequest } from '@/api/address';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import useSWRImmutable from 'swr/immutable';

interface AddressFormProps {
  listProvince: AddressDetailSchemaType[];
  defaultValues?: {
    provinceCode: string;
    districtCode: string;
    wardCode: string;
  };
  register: any;
  fieldName: string;
  disabledProvince?: boolean;
}

export default function AddressForm({
  listProvince,
  register,
  defaultValues,
  fieldName,
  disabledProvince,
}: AddressFormProps) {
  const [province, setProvince] = useState<string>(defaultValues?.provinceCode || '0');
  const [district, setDistrict] = useState<string>(defaultValues?.districtCode || '0');
  const [ward, setWard] = useState<string>(defaultValues?.wardCode || '0');

  const fetchDistrict = (provinceCode: string) =>
    addressApiRequest.getDistrict(provinceCode).then((res) => res.payload.data);
  const fetchWard = (districtCode: string) => addressApiRequest.getWard(districtCode).then((res) => res.payload.data);
  const {
    data: listDistrict,
    error: errorDistrict,
    isLoading: isLoadingDistrict,
  } = useSWRImmutable(province === '0' ? null : `api/address/districts?code=${province}`, () =>
    fetchDistrict(province)
  );
  const {
    data: listWard,
    error: errorWard,
    isLoading: isLoadingWard,
  } = useSWRImmutable(district === '0' ? null : `api/address/wards?code=${district}`, () => fetchWard(district));

  const onSelectProvince = (e: any) => {
    setProvince(e.target.value);
    setDistrict('0');
    setWard('0');
  };

  const onSelectDistrict = (e: any) => {
    setDistrict(e.target.value);
    setWard('0');
  };

  // if (isLoadingDistrict || isLoadingWard) {
  //   return <></>;
  // }

  return (
    <>
      <Col md={4}>
        <select
          className="form-select"
          id="province"
          onChange={(e) => {
            onSelectProvince(e);
          }}
          value={province}
          disabled={disabledProvince}
        >
          <option disabled key="0" value="0">
            Chọn Tỉnh / TP
          </option>
          {listProvince.map((province) => (
            <option key={province.code} value={province.code}>
              {province.full_name}
            </option>
          ))}
        </select>
      </Col>

      <Col md={4}>
        <select
          className="form-select"
          onChange={(e) => {
            onSelectDistrict(e);
          }}
          value={district}
        >
          <option disabled key="0" value="0">
            Chọn Quận/ Huyện
          </option>
          {listDistrict?.map((district) => (
            <option key={district.code} value={district.code}>
              {district.full_name}
            </option>
          ))}
        </select>
      </Col>

      <Col md={4}>
        <select
          className="form-select"
          value={ward}
          {...register(fieldName, {
            onChange: (e: any) => {
              setWard(e.target.value);
            },
          })}
        >
          <option disabled key="0" value="0">
            Chọn phường xã
          </option>
          {listWard?.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.full_name}
            </option>
          ))}
        </select>
      </Col>
    </>
  );
}
