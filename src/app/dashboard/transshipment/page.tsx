import { workPlateApiRequest } from '@/api/workplate';
import { CreateTransshipment } from '@/components/dashboard/button';
import TransactionPointTable from '@/components/dashboard/table/transactionPoint-table';
import { WorkPlateResType } from '@/schema/workplate.schema';
import { cookies } from 'next/headers';
import { Button } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';

interface TransactionPageProps {
  searchParams: {
    headName: string;
    provinceID: string;
    name: string;
    page: number;
    limit: number;
    startOrdersSort: string;
    endOrdersSort: string;
  };
}

export default async function TransactionPage({ searchParams }: TransactionPageProps) {
  const query = {
    headName: searchParams.headName,
    provinceID: searchParams.provinceID,
    name: searchParams.name,
    page: searchParams.page,
    limit: searchParams.limit,
    startOrdersSort: searchParams.startOrdersSort,
    endOrdersSort: searchParams.endOrdersSort,
  };
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let listWorkPlates: WorkPlateResType[] = [];
  if (token) {
    const data = await workPlateApiRequest.getWorkPlate(token.value);
    listWorkPlates = data.payload.data.filter((item) => item.type.id === 3);
  }

  return (
    <div className="tableContainer">
      <div className="row ">
        <div className="col">
          <h3>Danh sách điểm trung chuyển</h3>
        </div>

        <div className="col btnContainer">
          <CreateTransshipment />
        </div>
      </div>
      <div className="row mt-2">
        <TransactionPointTable page={query.page} query={query} limit={query.limit} data={listWorkPlates} />
      </div>
    </div>
  );
}
