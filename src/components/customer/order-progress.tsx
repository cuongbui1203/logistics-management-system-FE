import { Container, Col } from 'react-bootstrap';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoLocationOutline } from 'react-icons/io5';
import '@/css/customer/timeline.css';
import { OrderSchemaType } from '@/schema/common.schema';
import { OrderStatus } from '@/config/Enum';
import { formatDateTime, timestampToDateTime } from '@/lib/utils';

export default function OrderProgress({ orderProcesses }: { orderProcesses: OrderSchemaType }) {
  const data = orderProcesses.notifications;

  return (
    <Container>
      <div className="wrapper">
        <div className="center-line"></div>
        <div className="row">
          {data.map((process, index) => {
            const status = OrderStatus[process.status_id as keyof typeof OrderStatus] || {};
            return (
              <section key={index}>
                <TbTruckDelivery className="icon" />
                <div className="details">
                  <Col xs="10" className="me-2 text-justify">
                    <span className="title">
                      {' '}
                      <IoLocationOutline size={'2em'} />
                      {process?.from_address.address}, {process?.from_address.ward}, {process?.from_address.district},{' '}
                      {process?.from_address.province}
                    </span>
                  </Col>
                  <Col>
                    <span className="time">{formatDateTime(new Date(process.created_at))}</span>
                  </Col>
                </div>
                <p>
                  <span
                    className={`badge rounded-pill bg-${
                      OrderStatus[process?.status_id as keyof typeof OrderStatus].color
                    } p-2`}
                  >
                    {OrderStatus[process?.status_id as keyof typeof OrderStatus].name}
                  </span>{' '}
                </p>
              </section>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
