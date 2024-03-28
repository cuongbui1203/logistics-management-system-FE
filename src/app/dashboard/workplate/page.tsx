'use client';
import { useCurrentRole } from '@/hooks/use-current-role';

export default function WorkPlate() {
  const role = useCurrentRole();

  return (
    <div className="tableContainer">
      <div className="row ">
        <div className="col">
          <h3>Danh sách WorkPlate</h3>
        </div>
      </div>
      <div>Current role: {role}</div>
      <div className="row">Admin only</div>
    </div>
  );
}
