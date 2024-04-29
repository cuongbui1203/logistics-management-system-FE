'use client';
import { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import useSWR from 'swr';
import '@/css/dashboard/customForm.css';
import { useForm } from 'react-hook-form';
import { AccountNewReq, AccountNewReqType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { formatDate2, handleErrorApi } from '@/lib/utils';
import { AddressDetailSchemaType, UserSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import { addressApiRequest } from '@/api/address';
import { workPlateApiRequest } from '@/api/workplate';
import { RoleId, UserRole } from '@/config/Enum';
import { useAppContext } from '@/app/app-provider';

interface Props {
  employee: UserSchemaType;
  listProvince: AddressDetailSchemaType[];
  listDistrict_1: AddressDetailSchemaType[];
  listWard_1: AddressDetailSchemaType[];
}

export default function EmployeeInformation({ employee, listDistrict_1, listProvince, listWard_1 }: Props) {
  const { user } = useAppContext();

  const userRole = user?.role?.name;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AccountNewReqType>({
    resolver: zodResolver(AccountNewReq),
    defaultValues: {
      name: employee?.name,
      email: employee?.email,
      phone: employee?.phone || '',
      dob: formatDate2(employee?.dob),
      username: employee?.username,
      address_id: employee?.address.wardCode,
      role_id: employee?.role.id,
      wp_id: employee?.wp_id,
    },
  });

  async function onSubmit(values: AccountNewReqType) {
    console.log(values);
    try {
      toast.success('Cập nhật nhân viên thành công');
    } catch (error) {
      handleErrorApi({ error, setError });
    }
  }

  const [listDistrict, setListDistrict] = useState<AddressDetailSchemaType[]>(listDistrict_1);
  const [listWard, setListWard] = useState<AddressDetailSchemaType[]>(listWard_1);
  const [listWp, setListWp] = useState<WorkPlateSchemaType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await workPlateApiRequest.getWorkPlateSuggestClient(employee.address.wardCode).then((res) => {
          setListWp(res.payload.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

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

  const onSelectWard = (e: any) => {
    const wardID = e.target.value;
    workPlateApiRequest.getWorkPlateSuggestClient(wardID).then((res) => {
      setListWp(res.payload.data);
      console.log(res.payload.data);
    });
  };

  if (listWp.length == 0) return <p>Loading...</p>;

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
              defaultValue={employee?.address.provinceCode}
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
              defaultValue={employee?.address.districtCode}
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
              defaultValue={employee?.address.wardCode}
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
                  defaultValue={employee?.work_plate?.id}
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
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật thông tin'}
            </button>
          </div>
        </Row>
      </Form>
      {/* <PopUp isOpen={popup} setIsOpen={setPopup} functionCreate={createEmployee} dataCreate={employee} /> */}
    </div>
  );
}
