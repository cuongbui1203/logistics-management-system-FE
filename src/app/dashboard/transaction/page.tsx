import { addressApiRequest } from '@/api/address';
import { CreateTransaction } from '@/components/button';
import WorkPlateTable from '@/components/dashboard/work-plate/workPlate-table';

interface TransactionPageProps {
  searchParams: {
    page: number;
  };
}

export default async function TransactionPage({ searchParams }: TransactionPageProps) {
  const query = {
    page: searchParams.page || 1,
  };

  const listProvince = await addressApiRequest.getProvince();

  return (
    <div className="tableContainer">
      <div className="row ">
        <div className="col">
          <h3>Danh sách điểm giao dịch</h3>
        </div>

        <div className="col btnContainer">
          <CreateTransaction />
        </div>
      </div>
      <div className="row mt-2">
        <WorkPlateTable page={query.page} type={2} listProvince={listProvince.payload.data} />
      </div>
    </div>
  );
}
