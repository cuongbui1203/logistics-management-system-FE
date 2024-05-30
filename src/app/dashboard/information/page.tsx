import Preview from '@/components/dashboard/information/preview';
import { Col, Row } from 'react-bootstrap';
import InformationClient from './client-page';
import { addressApiRequest } from '@/api/address';

export default async function Information() {
  const listProvince = await addressApiRequest.getProvince();
  const listProvinceOptions = listProvince.payload.data.map((province) => {
    return {
      value: province.code,
      label: province.full_name,
    };
  });

  return (
    <Row>
      <Col xs="12" md="4">
        <Preview />
      </Col>

      <Col>
        <InformationClient listProvince={listProvinceOptions} />
      </Col>
    </Row>
  );
}
