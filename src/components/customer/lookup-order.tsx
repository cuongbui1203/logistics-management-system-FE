import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import OrderTracking from './tracking-order';
import useSWR from 'swr';
import { fetchOrderDetail } from '@/lib/custom-hook';

let orID: string = '';

export default function LookUpOrder() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [orderID, setOrderID] = useState(searchParams.get('query') || '');

  const { data, error, isLoading } = useSWR(orderID === '' ? null : ['api/orders', orderID], () =>
    fetchOrderDetail(orderID)
  );

  const handleSearch = async (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete('query');
    }
    setOrderID(term);
  };

  return (
    <>
      <Container className="lookUpContainer">
        <Row>
          <Col>
            <HiOutlineDocumentSearch size={'2rem'} />
            <p>Nhập mã đơn hàng</p>
          </Col>
        </Row>

        <Row>
          <Container>
            <Form>
              <Row>
                <Col xs="12" md="9" className="mb-2">
                  <Form.Control
                    className="rounded border"
                    required
                    name="query"
                    type="text"
                    onChange={(e) => (orID = e.target.value)}
                    defaultValue={searchParams.get('query') || ''}
                  />
                </Col>

                <Col xs="12" md="3">
                  <Button className="w-100" onClick={() => handleSearch(orID)}>
                    Tra cứu
                  </Button>
                </Col>
              </Row>

              <Row>{orderID !== '' && !data && <p className="text-danger m-0">Không tìm thấy bưu gửi</p>}</Row>
            </Form>
          </Container>
        </Row>
      </Container>

      {data && <OrderTracking data={data} />}
    </>
  );
}
