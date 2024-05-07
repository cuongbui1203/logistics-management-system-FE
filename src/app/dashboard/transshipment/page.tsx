import { CreateTransshipment } from '@/components/button';
import TransactionPointTable from '@/components/dashboard/table/transactionPoint-table';

interface TransactionPageProps {
  searchParams: {
    page: number;
  };
}

export default async function TransactionPage({ searchParams }: TransactionPageProps) {
  const query = {
    page: searchParams.page || 1,
  };

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
        <TransactionPointTable type={3} page={query.page} query={query} />
      </div>
    </div>
  );
}
