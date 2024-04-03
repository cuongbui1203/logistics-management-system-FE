import { useRouter } from 'next/navigation';
import { FaRegEye } from 'react-icons/fa6';

export function EmployeeDetail({ id }: { id: number }) {
  const route = useRouter();

  return (
    <button
      onClick={() => {
        route.push(`/employees/list_employee/${id}/detail`);
      }}
      className="btn btn-outline-warning"
    >
      <FaRegEye />
    </button>
  );
}
