'use client';

import { addressApiRequest } from '@/api/address';
import { SelectOptionsPropsString, WorkPlateSchemaType } from '@/schema/common.schema';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import useSWRImmutable from 'swr/immutable';
import TransactionList from './transaction-list';
import { workPlateApiRequest } from '@/api/workplate';
import Select from 'react-select';

export default function LookUpTransaction({ listProvince }: { listProvince: SelectOptionsPropsString[] }) {
  const [province, setProvince] = useState<SelectOptionsPropsString>({ value: '0', label: 'Chọn Tỉnh / TP' });
  const [district, setDistrict] = useState<SelectOptionsPropsString>({ value: '0', label: 'Chọn Quận/ Huyện' });
  const [ward, setWard] = useState<SelectOptionsPropsString>({ value: '0', label: 'Chọn Phường/ Xã' });
  const [listWp, setListWp] = useState<WorkPlateSchemaType[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const fetchDistrict = (provinceCode: string) =>
    addressApiRequest
      .getDistrict(provinceCode)
      .then((res) => res.payload.data.map((item) => ({ value: item.code, label: item.full_name })));
  const fetchWard = (districtCode: string) =>
    addressApiRequest
      .getWard(districtCode)
      .then((res) => res.payload.data.map((item) => ({ value: item.code, label: item.full_name })));

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

  const onSelectProvince = (e: SelectOptionsPropsString | null) => {
    if (!e) return;
    setProvince(e);
    setDistrict({ value: '0', label: 'Chọn Quận/ Huyện' });
    setWard({ value: '0', label: 'Chọn Phường/ Xã' });
  };

  const onSelectDistrict = (e: SelectOptionsPropsString | null) => {
    if (!e) return;
    setDistrict(e);
    setWard({ value: '0', label: 'Chọn Phường/ Xã' });
  };

  const handleClick = async () => {
    await workPlateApiRequest.getWorkPlateSuggestClient(ward.value).then((res) => {
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
                {isMounted && (
                  <>
                    <Select
                      id="province"
                      className="selectContainer"
                      options={listProvince}
                      onChange={onSelectProvince}
                      maxMenuHeight={175}
                      value={province}
                    />

                    <Select
                      id="district"
                      className="selectContainer"
                      options={listDistrict}
                      onChange={onSelectDistrict}
                      maxMenuHeight={175}
                      value={district}
                    />

                    <Select
                      id="ward"
                      className="selectContainer"
                      options={listWard}
                      onChange={(e) => {
                        if (!e) return;
                        setWard(e);
                      }}
                      maxMenuHeight={175}
                      value={ward}
                    />
                  </>
                )}

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
