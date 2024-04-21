'use client';

import { addressApiRequest } from '@/api/address';
import { useAppContext } from '@/app/app-provider';
import { UserRole, WorkPlateEnumType } from '@/config/Enum';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { WorkPlateNewReq, WorkPlateNewReqType } from '@/schema/workplate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function TransactionForm() {
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
      name: '',
      type_id: WorkPlateEnumType.Transaction,
    },
  });

  async function onSubmit(values: WorkPlateNewReqType) {
    console.log(values);
    // try {
    //   await workPlateApiRequest.createAccount(values).then((res) => {
    //     if (res.payload.success) {
    //       router.push('/dashboard/employee');
    //       toast.success('Tạo nhân viên thành công');
    //     } else {
    //       toast.error('Tạo nhân viên thất bại');
    //     }
    //   });
    // } catch (error) {
    //   handleErrorApi({ error, setError });
    // }
  }

  const [listProvince, setListProvince] = useState<AddressDetailSchemaType[]>([]);
  const [listDistrict, setListDistrict] = useState<AddressDetailSchemaType[]>([]);
  const [listWard, setListWard] = useState<AddressDetailSchemaType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await addressApiRequest.getProvinceClient().then((res) => {
          setListProvince(res.payload.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
              <Form.Control type="text" id="username" placeholder="Tên đăng nhập" {...register('name')} />
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
              defaultValue={'Chọn Tỉnh / TP'}
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
              defaultValue={'Chọn Quận/ Huyện'}
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
            <select className="form-select" defaultValue={'Chọn phường xã'} {...register('address_id')}>
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
              {isSubmitting ? 'Đang xử lý...' : 'Tạo điểm giao dịch'}
            </Button>
          </div>
        </Row>
      </Form>
      {/* <PopUp isOpen={popup} setIsOpen={setPopup} functionCreate={createEmployee} dataCreate={employee} /> */}
    </div>
  );
}
