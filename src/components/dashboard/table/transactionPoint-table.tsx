'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../pagination';
import { useDebouncedCallback } from 'use-debounce';
import '@/css/dashboard/customTable.css';
import { WorkPlateResType } from '@/schema/workplate.schema';
import { TransactionDetail } from '@/components/button';

interface TransactionPointTableProps {
  page: any;
  query: any;
  limit: any;
  data: WorkPlateResType[];
}

export default function TransactionPointTable({ page, query, limit, data }: TransactionPointTableProps) {
  // const provinceData = getAllProvince();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleHeadName = (e: any) => {};
  const handleName = (e: any) => {};
  const handleAddress = (e: any) => {};
  const handleStartOrdersSort = (e: any) => {};
  const handleEndOrdersSort = (e: any) => {};

  // const handleHeadName = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('headName', term);
  //   } else {
  //     params.delete('headName');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  // const handleName = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('name', term);
  //   } else {
  //     params.delete('name');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  // const handleAddress = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('provinceID', term);
  //   } else {
  //     params.delete('provinceID');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  // const handleStartOrdersSort = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('startOrdersSort', term);
  //     params.delete('endOrdersSort');
  //   } else {
  //     params.delete('startOrdersSort');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);
  // const handleEndOrdersSort = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('endOrdersSort', term);
  //     params.delete('startOrdersSort');
  //   } else {
  //     params.delete('endOrdersSort');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  // const [listWorkPlates, setListWorkPlates] = useState<WorkPlateResType[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await workPlateApiRequest.getWorkPlateClient().then((res) => {
  //         setListWorkPlates(res.payload.data);
  //         console.log(res.payload.message ,res.payload.data);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive text-nowrap">
            <table className="transactionTable w-100">
              <thead>
                <tr>
                  <th scope="col" className="col-sm-1">
                    STT
                  </th>
                  <th scope="col" className="col-sm-2">
                    Tên điểm
                  </th>
                  <th scope="col" className="col-sm-2">
                    Trưởng điểm
                  </th>
                  <th scope="col" className="col-sm-6">
                    Địa chỉ
                  </th>
                  <th scope="col"></th>
                  {/* <th scope="col">Đơn hàng đã nhận</th>
                  <th scope="col">Đơn hàng đã chuyển</th> */}
                </tr>
                {/* <tr className="filter">
                  <th scope="col"> </th>
                  <th scope="col">
                    <input onChange={(e) => handleName(e.target.value)} placeholder="Lọc theo tên điểm" />
                  </th>
                  <th scope="col">
                    <input onChange={(e) => handleHeadName(e.target.value)} placeholder="Lọc theo tên trưởng điểm" />
                  </th>
                  <th scope="col">
                    <select onChange={(e) => handleAddress(e.target.value)}>
                      <option value="">Chọn tỉnh/ thành phố</option>
                      {/* {provinceData.map((province) => (
                                                <option
                                                    key={province.provinceIDnceID}
                                                    value={province.provinceID}
                                                >
                                                    {province.name}
                                                </option>
                                            ))}
                    </select>
                  </th>
                  {/* <th scope="col">
                    <select onChange={(e) => handleEndOrdersSort(e.target.value)}>
                      <option value="">Sắp xếp theo</option>
                      <option value="ASC">Tăng</option>
                      <option value="DESC">Giảm</option>
                    </select>
                  </th>
                  <th scope="col">
                    <select onChange={(e) => handleStartOrdersSort(e.target.value)}>
                      <option value="">Sắp xếp theo</option>
                      <option value="ASC">Tăng</option>
                      <option value="DESC">Giảm</option>
                    </select>
                  </th> 
                </tr> */}
              </thead>
              <tbody className="table-group-divider">
                {data?.map((workplate, index) => (
                  <tr key={workplate.id}>
                    <td>{index + 1}</td>
                    <td>{workplate.name}</td>
                    <td>{workplate.manager?.name}</td>
                    <td>
                      {workplate.address.ward},{workplate.address.district},{workplate.address.province}
                    </td>
                    {/* <td>{workplate.type.name}</td>
                    <td>{workplate.id}</td> */}
                    <td className="d-flex justify-content-center gap-1">
                      <TransactionDetail id={workplate?.id} />
                      {/* <EmployeeDelete id={employee?.id} onRefresh={() => setRefresh(true)} /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={1} />
    </div>
  );
}
