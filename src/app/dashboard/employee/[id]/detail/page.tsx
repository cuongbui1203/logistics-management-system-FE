import EmployeeInformation from './employee-detail';

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return <EmployeeInformation id={id} />;
}
