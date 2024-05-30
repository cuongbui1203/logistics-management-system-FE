'use client';

import { addressApiRequest } from '@/api/address';
import { AddressSchemaType, SelectOptionsPropsString } from '@/schema/common.schema';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import useSWRImmutable from 'swr/immutable';

interface SelectOptionsProps {
  value: string;
  label: string;
}

interface AddressFormProps {
  listProvince: SelectOptionsPropsString[];
  defaultValues?: AddressSchemaType;
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
  const defaultProvince = defaultValues
    ? { value: defaultValues.provinceCode, label: defaultValues.province }
    : { value: '0', label: 'Chọn Tỉnh / TP' };

  const defaultDistrict = defaultValues
    ? { value: defaultValues.districtCode, label: defaultValues.district }
    : { value: '0', label: 'Chọn Quận/ Huyện' };

  const defaultWard = defaultValues
    ? { value: defaultValues.wardCode, label: defaultValues.ward }
    : { value: '0', label: 'Chọn Phường/ Xã' };

  const [province, setProvince] = useState<SelectOptionsPropsString>(defaultProvince);
  const [district, setDistrict] = useState<SelectOptionsPropsString>(defaultDistrict);
  const [ward, setWard] = useState<string>(defaultWard.value);

  const fetchDistrict = (provinceCode: string) =>
    addressApiRequest
      .getDistrict(provinceCode)
      .then((res) => res.payload.data.map((item) => ({ value: item.code, label: item.full_name })));
  const fetchWard = (districtCode: string) => addressApiRequest.getWard(districtCode).then((res) => res.payload.data);

  const {
    data: listDistrict,
    error: errorDistrict,
    isLoading: isLoadingDistrict,
  } = useSWRImmutable(province.value === '0' ? null : `api/address/districts?code=${province.value}`, () =>
    fetchDistrict(province.value)
  );
  const {
    data: listWard,
    error: errorWard,
    isLoading: isLoadingWard,
  } = useSWRImmutable(district.value === '0' ? null : `api/address/wards?code=${district.value}`, () =>
    fetchWard(district.value)
  );

  const onSelectProvince = (e: SelectOptionsProps | null) => {
    if (!e) return;
    setProvince(e);
    setDistrict({ value: '0', label: 'Chọn Quận/ Huyện' });
    setWard('0');
  };

  const onSelectDistrict = (e: SelectOptionsPropsString | null) => {
    if (!e) return;
    setDistrict(e);
    setWard('0');
  };

  return (
    <>
      <Col md={4}>
        <Select
          id="province"
          options={listProvince}
          onChange={onSelectProvince}
          maxMenuHeight={175}
          value={province}
          placeholder="Chọn Tỉnh / TP"
          isDisabled={disabledProvince}
        />
      </Col>

      <Col md={4}>
        <Select
          id="district"
          className="selectContainer"
          options={listDistrict}
          onChange={onSelectDistrict}
          maxMenuHeight={175}
          value={district}
        />
      </Col>

      <Col md={4}>
        {/* <Controller
  control={control}
  defaultValue={listWard.map(c => c.value)}
  name={fieldName}
  render={({ field: { onChange, value, ref }}) => (
    <Select
      inputRef={ref}
      value={ward}
      onChange={val => onChange(val.map(c => c.value))}
      options={options}
      isMulti
    />
  )}
/> */}
        {/* <Select
          id="ward"
          className="selectContainer"
          options={listWard}
          maxMenuHeight={175}
          value={ward}
          {...register(fieldName, {
            onChange: (e: any) => {
              if (!e) return;
              console.log(e);
              setWard(e);
            },
          })}
        /> */}
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
