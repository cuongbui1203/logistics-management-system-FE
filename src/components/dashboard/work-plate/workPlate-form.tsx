'use client';

import { workPlateApiRequest } from '@/api/workplate';
import { useAppContext } from '@/app/app-provider';
import AddressForm from '@/components/address-form';
import { Area, UserRole, WorkPlateEnumType } from '@/config/Enum';
import { handleErrorApi } from '@/lib/utils';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { WorkPlateNewReq, WorkPlateNewReqType } from '@/schema/workplate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function TransactionForm({
  listProvince,
  type,
}: {
  listProvince: AddressDetailSchemaType[];
  type: number;
}) {
  const router = useRouter();
  const { user } = useAppContext();
  const userRole = user?.role?.name;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WorkPlateNewReqType>({
    resolver: zodResolver(WorkPlateNewReq),
  });

  if (userRole !== UserRole.Admin) {
    return <div>403</div>;
  }

  async function onSubmit(values: WorkPlateNewReqType) {
    values.type_id = type;
    try {
      await workPlateApiRequest.createWP(values).then((res) => {
        if (res.payload.success) {
          if (type === WorkPlateEnumType.Transaction) {
            toast.success('Tạo điểm giao dịch thành công');
            router.push('/dashboard/transaction?created=true');
          } else {
            toast.success('Tạo điểm trung chuyển thành công');
            router.push('/dashboard/transshipment?created=true');
          }
        }
      });
    } catch (error) {
      handleErrorApi({ error, setError });
    }
  }

  return (
    <div className="formContainer">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-2">
          <h3>{type === WorkPlateEnumType.Transaction ? 'Thông tin điểm giao dịch' : 'Thông tin điểm trung chuyển'}</h3>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="username">
                {type === WorkPlateEnumType.Transaction ? 'Tên điểm giao dịch' : 'Tên điểm trung chuyển'}
              </Form.Label>
              <Form.Control
                type="text"
                id="username"
                placeholder="Tên điểm giao dịch / trung chuyển"
                {...register('name')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Form.Group className="col-sm-12 col-form-Form.Group">Địa chỉ</Form.Group>
          <AddressForm listProvince={listProvince} register={register} fieldName="address_id" />
          <Form.Group className="mt-2">
            <Form.Control type="text" id="address" placeholder="Địa điểm cụ thể" {...register('address')} />
          </Form.Group>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="area">Khu vực quản lý</Form.Label>
              {/* TODO:  */}
              <select id="area" className="form-select" defaultValue={'Chọn khu vực'} {...register('cap')}>
                <option key={0} disabled>
                  Chọn khu vực quản lý
                </option>
                {Area.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <div className="mt-3 btnContainer">
            <Button className="btn btnCreate" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Đang xử lý...'
                : type === WorkPlateEnumType.Transaction
                ? 'Tạo điểm giao dịch'
                : 'Tạo điểm trung chuyển'}
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
}
