import { CreateTransshipment } from '@/components/button';
import WorkPlateTable from '@/components/dashboard/work-plate/workPlate-table';
import { addressApiRequest } from '@/api/address';
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
      <div className="row">
        <div className="col">
          <h3>Danh sách điểm trung chuyển</h3>
        </div>

        <div className="col btnContainer">
          <CreateTransshipment />
        </div>
      </div>
      <div className="row mt-2">
        <WorkPlateTable type={3} page={query.page} listProvince={listProvince.payload.data} />
      </div>
    </div>
  );
}
