'use client';

import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaRegCalendar } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { useAppContext } from '@/app/app-provider';
import { IoMdPhonePortrait } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { UpdateUserBody, UpdateUserBodyType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { addressApiRequest } from '@/api/address';
import authApiRequest from '@/api/auth';
import { toast } from 'react-toastify';
import { formatDate2, handleErrorApi } from '@/lib/utils';

export default function MainInformation({ listProvince }: { listProvince: AddressDetailSchemaType[] }) {
  const { user, setUser } = useAppContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserBodyType>({
    resolver: zodResolver(UpdateUserBody),
    defaultValues: {
      name: user?.name || '',
      dob: formatDate2(user?.dob),
      email: user?.email || '',
      phone: user?.phone?.toString() || '',
      address_id: user?.address?.wardCode || '',
    },
  });

  async function onSubmit(values: UpdateUserBodyType) {
    if (!user) return;

    try {
      const result = await authApiRequest.updateUserClient(values, user.id);

      const data = result.payload.data;
      setUser(data);

      toast.success('Cập nhật thông tin thành công');
    } catch (error: any) {
      handleErrorApi({ error, setError, message: 'Cập nhật thông tin thất bại!' });
    }
  }

  const [listDistrict, setListDistrict] = useState<AddressDetailSchemaType[]>([]);
  const [listWard, setListWard] = useState<AddressDetailSchemaType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.address !== undefined) {
          await addressApiRequest.getDistrictClient(user.address.provinceCode).then((res) => {
            setListDistrict(res.payload.data);
          });
          await addressApiRequest.getWardClient(user?.address.districtCode).then((res) => {
            setListWard(res.payload.data);
          });
        }
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

  if (listWard.length == 0) return <p>Loading...</p>;

  return (
    <Form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <h3>Thông tin nhân viên</h3>
      </Row>
      <Row className="mt-2">
        <Col md={6}>
          <Form.Group controlId="name">
            <Form.Label>Họ và tên</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaRegUserCircle />
              </InputGroup.Text>
              <Form.Control type="text" {...register('name')} />
            </InputGroup>
            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="dob">
            <Form.Label>Ngày sinh</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaRegCalendar />
              </InputGroup.Text>
              <Form.Control type="date" {...register('dob')} />
            </InputGroup>
            {errors.dob && <Form.Text className="text-danger">{errors.dob.message}</Form.Text>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>Địa chỉ Email</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <MdAlternateEmail />
              </InputGroup.Text>
              <Form.Control type="email" {...register('email')} />
            </InputGroup>
            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="phone">
            <Form.Label>Số điện thoại</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <IoMdPhonePortrait />
              </InputGroup.Text>
              <Form.Control type="tel" {...register('phone')} />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-2">
        <Form.Label className="col-sm-12 col-form-label">Địa chỉ</Form.Label>
        <Col md={4}>
          <select
            className="form-select"
            id="province"
            onChange={(e) => {
              onSelectProvince(e);
            }}
            defaultValue={user?.address.provinceCode}
          >
            {listProvince.map((province) => (
              <option key={province.code} value={province.code}>
                {province.full_name}
              </option>
            ))}
          </select>
        </Col>

        <Col md={4}>
          <select
            className="form-select"
            onChange={(e) => {
              onSelectDistrict(e);
            }}
            defaultValue={user?.address.districtCode}
          >
            {listDistrict.map((district) => (
              <option key={district.code} value={district.code}>
                {district.full_name}
              </option>
            ))}
          </select>
        </Col>

        <Col md={4}>
          <select className="form-select" defaultValue={user?.address.wardCode} {...register('address_id')}>
            {listWard.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.full_name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <div className="mt-3 btnContainer d-flex justify-content-center">
        <Button type="submit" className="btn btnCreate" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Cập nhật thông tin'}
        </Button>
      </div>
    </Form>
  );
}
