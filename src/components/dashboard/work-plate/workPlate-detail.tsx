'use client';

import { workPlateApiRequest } from '@/api/workplate';
import { useAppContext } from '@/app/app-provider';
import AddressForm from '@/components/address-form';
import { Area, UserRole, WorkPlateEnumType } from '@/config/Enum';
import { useWorkPlate } from '@/lib/custom-hook';
import { handleErrorApi } from '@/lib/utils';
import { AddressDetailSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import { WorkPlateNewReq, WorkPlateNewReqType } from '@/schema/workplate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface WorkPlateDetailProps {
  workPlate: WorkPlateSchemaType;
  listProvince: AddressDetailSchemaType[];
  type: number;
}

export default function WorkPlateDetail({ workPlate, listProvince, type }: WorkPlateDetailProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAppContext();
  const userRole = user?.role?.name;

  const page = Number(searchParams.get('fromPage'));
  const { mutate } = useWorkPlate(page, type);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WorkPlateNewReqType>({
    resolver: zodResolver(WorkPlateNewReq),
    defaultValues: {
      name: workPlate?.name,
      type_id: type,
      address_id: workPlate.address.wardCode,
      address: workPlate.address.address,
      cap: workPlate.cap,
    },
  });

  if (userRole !== UserRole.Admin) {
    return <div>403</div>;
  }

  async function onSubmit(values: WorkPlateNewReqType) {
    values.type_id = type;
    try {
      await workPlateApiRequest.updateWP(workPlate.id, values).then((res) => {
        if (res.payload.success) {
          mutate();
          if (type === WorkPlateEnumType.Transaction) {
            toast.success('Cập nhật điểm giao dịch thành công');
            router.push(`/dashboard/transaction?page=${page}`);
          } else {
            toast.success('Cập nhật điểm trung chuyển thành công');
            router.push(`/dashboard/transshipment?page=${page}`);
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
          <h3>
            {type === WorkPlateEnumType.Transshipment ? 'Thông tin điểm trung chuyển' : 'Thông tin điểm giao dịch'}
          </h3>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="username">
                {type === WorkPlateEnumType.Transshipment ? 'Tên điểm trung chuyển' : 'Thông tin điểm giao dịch'}
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
          <AddressForm
            listProvince={listProvince}
            register={register}
            fieldName="address_id"
            defaultValues={workPlate.address}
          />
          <Form.Group className="mt-2">
            <Form.Control type="text" id="address" placeholder="Địa điểm cụ thể" {...register('address')} />
          </Form.Group>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="area">Khu vực quản lý</Form.Label>
              {/* TODO:  */}
              <select id="area" className="form-select" {...register('cap')}>
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
                : type === WorkPlateEnumType.Transshipment
                ? 'Cập nhật điểm trung chuyển'
                : 'Cập nhật điểm giao dịch'}
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
}
