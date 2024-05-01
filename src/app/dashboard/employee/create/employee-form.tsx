'use client';

import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useAppContext } from '@/app/app-provider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountNewReq, AccountNewReqType } from '@/schema/auth.schema';
import '@/css/dashboard/customForm.css';
import { addressApiRequest } from '@/api/address';
import { AddressDetailSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import { RoleId, UserRole } from '@/config/Enum';
import { workPlateApiRequest } from '@/api/workplate';
import accountApiRequest from '@/api/account';
import { handleErrorApi } from '@/lib/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function EmployeeForm({ listProvince }: { listProvince: AddressDetailSchemaType[] }) {
  const { user } = useAppContext();
  const router = useRouter();

  const userRole = user?.role?.name;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AccountNewReqType>({
    resolver: zodResolver(AccountNewReq),
  });

  async function onSubmit(values: AccountNewReqType) {
    console.log(values);
    try {
      await accountApiRequest.createAccount(values).then((res) => {
        if (res.payload.success) {
          router.push('/dashboard/employee');
          router.refresh();
          toast.success('Tạo nhân viên thành công');
        } else {
          toast.error('Tạo nhân viên thất bại');
        }
      });
    } catch (error) {
      handleErrorApi({ error, setError, message: 'Tạo nhân viên thất bại' });
    }
  }

  const [listDistrict, setListDistrict] = useState<AddressDetailSchemaType[]>([]);
  const [listWard, setListWard] = useState<AddressDetailSchemaType[]>([]);
  const [listWp, setListWp] = useState<WorkPlateSchemaType[]>([]);

  const onSelectProvince = (e: any) => {
    const provinceID = e.target.value;
    addressApiRequest.getDistrict(provinceID).then((res) => {
      setListDistrict(res.payload.data);
    });
  };

  const onSelectDistrict = (e: any) => {
    const districtID = e.target.value;
    addressApiRequest.getWard(districtID).then((res) => {
      setListWard(res.payload.data);
    });
  };

  const onSelectWard = (e: any) => {
    const wardID = e.target.value;
    workPlateApiRequest.getWorkPlateSuggestClient(wardID).then((res) => {
      setListWp(res.payload.data);
      console.log(res.payload.data);
    });
  };

  // const [popup, setPopup] = useState(false);

  return (
    <div className="formContainer">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-2">
          <h3>Thông tin nhân viên</h3>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="username">Tên đăng nhập</Form.Label>
              <Form.Control type="text" id="username" placeholder="Tên đăng nhập" {...register('username')} />
              {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="password">Mật khẩu</Form.Label>
              <Form.Control
                type="text"
                id="password"
                placeholder="Mật khẩu"
                defaultValue={'1'}
                {...register('password')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" id="fullName" placeholder="Họ và tên" {...register('name')} />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="dob">Ngày sinh</Form.Label>
              <Form.Control type="date" id="dob" {...register('dob')} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="email">Địa chỉ Email</Form.Label>
              <Form.Control type="email" id="email" placeholder="Địa chỉ email" {...register('email')} required />
              {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label htmlFor="phoneNumber">Số điện thoại</Form.Label>
              <Form.Control type="tel" id="phoneNumber" placeholder="Số điện thoại" {...register('phone')} />
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
            <select
              className="form-select"
              defaultValue={'Chọn phường xã'}
              {...register('address_id', {
                onChange: (e) => onSelectWard(e),
              })}
            >
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
          {userRole && userRole === UserRole.Admin && (
            <Col>
              <Form.Group>
                <Form.Label htmlFor="role">Vai trò</Form.Label>
                <select
                  className="form-select"
                  id="role"
                  defaultValue={'Chọn vai trò'}
                  {...register('role_id', {
                    setValueAs: (v) => parseInt(v),
                  })}
                >
                  <option disabled>Chọn vai trò</option>
                  {RoleId.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
          )}
        </Row>
        {userRole && userRole === 'Admin' && (
          <Row className="mt-2">
            <Col>
              <Form.Group className="col-sm-12 col-form-Form.Group">
                <Form.Label htmlFor="workplate">Địa điểm làm việc</Form.Label>
                <select
                  id="workplate"
                  className="form-select"
                  defaultValue={'Địa điểm làm việc'}
                  {...register('wp_id')}
                >
                  <option key={0} disabled>
                    Chọn địa điểm làm việc
                  </option>
                  {listWp.map((wp) => (
                    <option key={wp.id} value={wp.id}>
                      {wp.name} - {wp.address.province}, {wp.address.district}, {wp.address.ward}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
          </Row>
        )}
        <Row className="mt-2">
          <div className="mt-3 btnContainer">
            <button className="btn btnCreate" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : 'Tạo nhân viên'}
            </button>
          </div>
        </Row>
      </Form>
      {/* <PopUp isOpen={popup} setIsOpen={setPopup} functionCreate={createEmployee} dataCreate={employee} /> */}
    </div>
  );
}
