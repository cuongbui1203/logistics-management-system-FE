// import { getTransactionPoint } from '@/api/data';
import { WorkPlateSchemaType } from '@/schema/common.schema';
import { Container, Row, Col } from 'react-bootstrap';

export default function TransactionList({ listWp }: { listWp: WorkPlateSchemaType[] }) {
  return (
    <Container className="lookUpContainer" style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <Row>
        <Col>
          <h3>Số lượng bưu cục: {listWp.length}</h3>
        </Col>
      </Row>
      {listWp.map((item, index) => (
        <Row key={index} className="border-bottom mt-2">
          <Row>
            <h3>Tên: {item?.name}</h3>
          </Row>
          <Row>
            <p>
              Địa chỉ: {item?.address?.address}, {item?.address?.ward}, {item?.address?.district},{' '}
              {item?.address?.province}
            </p>
          </Row>
        </Row>
      ))}
    </Container>
  );
}
