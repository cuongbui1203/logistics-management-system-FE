import TransactionPointTable from '@/components/dashboard/table/transactionPoint-table';

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

  return (
    <div className="tableContainer">
      <div className="row ">
        <div className="col">
          <h3>Danh sách điểm giao dịch</h3>
        </div>
      </div>
      <div className="row">
        <TransactionPointTable page={query.page} query={query} limit={query.limit} />
      </div>
    </div>
  );
}
