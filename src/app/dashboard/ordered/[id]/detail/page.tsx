import OrderDetail from './order-detail';

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return <OrderDetail id={id} />;
}
