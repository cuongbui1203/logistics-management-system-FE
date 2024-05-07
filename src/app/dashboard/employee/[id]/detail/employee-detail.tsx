'use client';

import { Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AccountNewReq, AccountNewReqType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { formatDate2, handleErrorApi } from '@/lib/utils';
import { AddressDetailSchemaType, UserSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import { workPlateApiRequest } from '@/api/workplate';
import { RoleId, UserRole } from '@/config/Enum';
import { useAppContext } from '@/app/app-provider';
import useSWRImmutable from 'swr/immutable';
import AddressForm from '@/components/address-form';
import '@/css/dashboard/customForm.css';

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
    watch,
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

  const watchAddress = watch('address_id');

  const fetchSuggestWP = (wardCode: string) =>
    workPlateApiRequest.getWorkPlateSuggestClient(wardCode).then((res) => res.payload.data);

  const {
    data,
    error: errorWp,
    isLoading: isLoadingWp,
  } = useSWRImmutable(
    watchAddress === undefined || watchAddress === '0'
      ? null
      : `api/work-plates/suggestion-wp?address_id=${watchAddress}`,
    () => fetchSuggestWP(watchAddress)
  );

  let listWp: WorkPlateSchemaType[] = data || [];
  if (watchAddress === undefined || watchAddress === '0') {
    listWp = [];
  }

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
          <AddressForm
            listProvince={listProvince}
            register={register}
            defaultValues={employee?.address}
            fieldName="address_id"
          />
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
                  <option key={0} value="0" disabled>
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
