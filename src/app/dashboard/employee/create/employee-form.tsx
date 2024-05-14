'use client';

import { Row, Col, Form } from 'react-bootstrap';
import { useAppContext } from '@/app/app-provider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountNewReq, AccountNewReqType } from '@/schema/auth.schema';
import { AddressDetailSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import { RoleId, UserRole } from '@/config/Enum';
import { workPlateApiRequest } from '@/api/workplate';
import accountApiRequest from '@/api/account';
import { handleErrorApi } from '@/lib/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AddressForm from '@/components/address-form';
import useSWRImmutable from 'swr/immutable';
import '@/css/dashboard/customForm.css';

export default function EmployeeForm({ listProvince }: { listProvince: AddressDetailSchemaType[] }) {
  const { user } = useAppContext();
  const router = useRouter();

  const userRole = user?.role?.name;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AccountNewReqType>({
    resolver: zodResolver(AccountNewReq),
  });

  async function onSubmit(values: AccountNewReqType) {
    console.log(values);
    try {
      await accountApiRequest.createAccount(values).then((res) => {
        if (res.payload.success) {
          router.push('/dashboard/employee?created=true');
          toast.success('Tạo nhân viên thành công');
        }
      });
    } catch (error) {
      handleErrorApi({ error, setError, message: 'Tạo nhân viên thất bại' });
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
              {errors.phone && <Form.Text className="text-danger">{errors.phone.message}</Form.Text>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Form.Group className="col-sm-12 col-form-Form.Group">Địa chỉ</Form.Group>
          <AddressForm listProvince={listProvince} register={register} fieldName="address_id" />
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
                <select id="workplate" className="form-select" defaultValue={'0'} {...register('wp_id')}>
                  <option key={0} disabled value={'0'}>
                    Chọn địa điểm làm việc
                  </option>
                  {listWp?.map((wp) => (
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
    </div>
  );
}
