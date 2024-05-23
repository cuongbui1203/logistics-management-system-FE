import { Col, Row } from 'react-bootstrap';

interface StatisticItemProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

export default function StatisticItem({ icon, title, value, color }: StatisticItemProps) {
  return (
    <Col xs={12} md={6} lg={3} className="mt-2">
      <Row>
        <Col xs={3} className={`itemContainer ${color}`}>
          {icon}
        </Col>
        <Col>
          <Row className="title">
            <p>{title}</p>
          </Row>
          <Row className="statisticNumber">
            <h5>{value}</h5>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
