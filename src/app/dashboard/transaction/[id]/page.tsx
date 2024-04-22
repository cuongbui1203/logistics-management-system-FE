import { cookies } from 'next/headers';
import TransactionDetail from './transaction-detail';
import { workPlateApiRequest } from '@/api/workplate';

export default async function TransactionDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const data = await workPlateApiRequest.getDetailWorkPlate(token?.value || '', id);
  return <TransactionDetail workPlate={data.payload.data} />;
}
