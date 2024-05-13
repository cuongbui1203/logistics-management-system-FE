'use client';

import { addressApiRequest } from '@/api/address';
import { AddressDetailSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import useSWRImmutable from 'swr/immutable';
import TransactionList from './transaction-list';
import { workPlateApiRequest } from '@/api/workplate';

export default function LookUpTransaction({ listProvince }: { listProvince: AddressDetailSchemaType[] }) {
  const [province, setProvince] = useState<string>('0');
  const [district, setDistrict] = useState<string>('0');
  const [ward, setWard] = useState<string>('0');
  const [listWp, setListWp] = useState<WorkPlateSchemaType[]>([]);

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

  const fetchSuggestWP = (wardCode: string) =>
    workPlateApiRequest.getWorkPlateSuggestClient(wardCode).then((res) => res.payload.data);

  const handleClick = async () => {
    await workPlateApiRequest.getWorkPlateSuggestClient(ward).then((res) => {
      setListWp(res.payload.data);
    });
  };

  return (
    <div>
      <Container className="lookUpContainer">
        <Row>
          <Col xs="12" md="6" className="mt-2">
            <Form>
              <Row>
                <Form.Select
                  aria-label="Chọn Tỉnh/ TP"
                  className="selectContainer"
                  onChange={(e) => {
                    onSelectProvince(e);
                  }}
                  value={province}
                  required
                >
                  <option disabled key="0" value="0">
                    Chọn Tỉnh / TP
                  </option>
                  {listProvince.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.full_name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  onChange={(e) => {
                    onSelectDistrict(e);
                  }}
                  value={district}
                  required
                  className="selectContainer"
                >
                  <option disabled key="0" value="0">
                    Chọn Quận/ Huyện
                  </option>
                  {listDistrict?.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.full_name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  aria-label="Chọn Xã/ Phường"
                  className="selectContainer"
                  onChange={(e) => {
                    setWard(e.target.value);
                  }}
                  value={ward}
                  required
                >
                  <option disabled key="0" value="0">
                    Chọn phường xã
                  </option>
                  {listWard?.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                      {ward.full_name}
                    </option>
                  ))}
                </Form.Select>

                <Button className="submitButton" onClick={handleClick}>
                  TRA CỨU
                </Button>
              </Row>
            </Form>
          </Col>

          <Col className="mapContainer mt-2" md="6" xs="12">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1VCEMjR_Ldo68vk5FiAWGf_7oV5r9PE8&ehbc=2E312F"
              width="630"
              height="350"
              className="map"
            ></iframe>
          </Col>
        </Row>
      </Container>
      <TransactionList listWp={listWp} />
    </div>
  );
}
