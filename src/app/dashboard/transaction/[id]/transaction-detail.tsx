'use client';

import { addressApiRequest } from '@/api/address';
import { workPlateApiRequest } from '@/api/workplate';
import { useAppContext } from '@/app/app-provider';
import { UserRole, WorkPlateEnumType } from '@/config/Enum';
import { handleErrorApi } from '@/lib/utils';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { WorkPlateNewReq, WorkPlateNewReqType, WorkPlateResType } from '@/schema/workplate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface TransactionDetailProps {
  workPlate: WorkPlateResType;
  listProvince: AddressDetailSchemaType[];
  listDistrict_1: AddressDetailSchemaType[];
  listWard_1: AddressDetailSchemaType[];
}

export default function TransactionDetail({
  workPlate,
  listProvince,
  listDistrict_1,
  listWard_1,
}: TransactionDetailProps) {
  const router = useRouter();
  const { user } = useAppContext();
  const userRole = user?.role?.name;

  if (userRole !== UserRole.Admin) {
    return <div>403</div>;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WorkPlateNewReqType>({
    resolver: zodResolver(WorkPlateNewReq),
    defaultValues: {
      name: workPlate?.name,
      type_id: WorkPlateEnumType.Transaction,
      address_id: workPlate?.address_id,
    },
  });

  async function onSubmit(values: WorkPlateNewReqType) {
    console.log(values);
    try {
      await workPlateApiRequest.createWP(values).then((res) => {
        if (res.payload.success) {
          toast.success('Cập nhật điểm giao dịch thành công');
          // router.push('/dashboard/transaction');
          // router.refresh();
        }
      });
    } catch (error) {
      handleErrorApi({ error, setError });
    }
  }

  const [listDistrict, setListDistrict] = useState<AddressDetailSchemaType[]>(listDistrict_1);
  const [listWard, setListWard] = useState<AddressDetailSchemaType[]>(listWard_1);

  const onSelectProvince = (e: any) => {
    const provinceID = e.target.value;
    addressApiRequest.getDistrictClient(provinceID).then((res) => {
      setListDistrict(res.payload.data);
    });
  };

  const onSelectDistrict = (e: any) => {
    const districtID = e.target.value;
    addressApiRequest.getWardClient(districtID).then((res) => {
      setListWard(res.payload.data);
    });
  };

  return (
    <div className="formContainer">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-2">
          <h3>Thông tin điểm giao dịch</h3>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="username">Tên điểm giao dịch</Form.Label>
              <Form.Control type="text" id="username" placeholder="Tên điểm giao dịch" {...register('name')} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Form.Group className="col-sm-12 col-form-Form.Group">Địa chỉ</Form.Group>
          <Col xs={12} md={4}>
            <select
              className="form-select"
              id="province"
              onChange={(e) => {
                onSelectProvince(e);
              }}
              defaultValue={workPlate.address.provinceCode}
            >
              <option disabled>Chọn Tỉnh / TP</option>
              {listProvince.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.full_name}
                </option>
              ))}
            </select>
          </Col>

          <Col xs={12} md={4}>
            <select
              className="form-select"
              onChange={(e) => {
                onSelectDistrict(e);
              }}
              defaultValue={workPlate.address.districtCode}
            >
              <option disabled>Chọn Quận/ Huyện</option>
              {listDistrict.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.full_name}
                </option>
              ))}
            </select>
          </Col>

          <Col xs={12} md={4}>
            <select className="form-select" defaultValue={workPlate.address.wardCode} {...register('address_id')}>
              <option disabled>Chọn phường xã</option>
              {listWard.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.full_name}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <Row className="mt-2">
          <div className="mt-3 btnContainer">
            <Button className="btn btnCreate" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật điểm giao dịch'}
            </Button>
          </div>
        </Row>
      </Form>
      {/* <PopUp isOpen={popup} setIsOpen={setPopup} functionCreate={createEmployee} dataCreate={employee} /> */}
    </div>
  );
}
