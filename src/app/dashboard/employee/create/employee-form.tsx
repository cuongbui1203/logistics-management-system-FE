'use client';
import { useEffect, useState } from 'react';
// import { createEmployee } from '@/api/action';
import { employeeRole } from '@/api/utils';
// import { getDistrictByProvinceID, getCommuneByDistrictID, getAllProvince } from '@/api/data';
import PopUp from '../../../../components/dashboard/popup';
import { Container, Row, Col, Form } from 'react-bootstrap';
import useSWR from 'swr';
import { useAppContext } from '@/app/app-provider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountNewReq, AccountNewReqType } from '@/schema/account.schema';
import '@/css/dashboard/customForm.css';
import { addressApiRequest } from '@/api/address';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { RoleId, UserRole } from '@/config/Enum';

export default function EmployeeForm() {
  const { user } = useAppContext();
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

  // const [popup, setPopup] = useState(false);

  if (listProvince.length == 0) return <p>Loading...</p>;

  return (
    <div className="formContainer">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <h3>Thông tin nhân viên</h3>
        </Row>
        <Row>
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

        <Row>
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

        <Row>
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
                  {province.name}
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
                  {district.name}
                </option>
              ))}
            </select>
          </Col>

          <Col xs={12} md={4}>
            <select
              className="form-select"
              defaultValue={'Chọn phường xã'}
              {...register('address_id', {
                setValueAs: (v) => parseInt(v),
              })}
            >
              <option disabled>Chọn phường xã</option>
              {listWard.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <Row>
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
                  {RoleId.map((role) => {
                    return (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>
            </Col>
          )}
        </Row>
        {userRole && userRole === 'Admin' && (
          <Row>
            <Form.Group className="col-sm-12 col-form-Form.Group">Địa điểm làm việc</Form.Group>
            <Col xs={12} md={4}>
              <select
                className="form-select"
                onChange={(e) => {
                  // setWorkingAddress({
                  //   provinceID: e.target.value,
                  //   communeID: 0,
                  //   districtID: 0,
                  // });
                  // setUrl(
                  //   `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${e.target.value}`
                  // );
                }}
                defaultValue={'Chọn tỉnh/TP'}
              >
                <option value={0}>Chọn tỉnh/TP</option>
                {/* {Array.isArray(allProvincePoint) &&
                  allProvincePoint?.map((province) => (
                    <option key={province.provinceID} value={province.provinceID}>
                      {province.name}
                    </option>
                  ))} */}
              </select>
            </Col>
            <Col xs={12} md={4}>
              <select
                className="form-select"
                onChange={(e) => {
                  // setWorkingAddress({
                  //   provinceID: workingAddress.provinceID,
                  //   communeID: 0,
                  //   districtID: e.target.value,
                  // });
                  // setUrl(
                  //   `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${workingAddress.provinceID}&districtID=${e.target.value}`
                  // );
                }}
                defaultValue={'Chọn Quận/Huyện'}
              >
                <option value={0}>Chọn Quận/Huyện</option>
                {/* {Array.isArray(allDistrictsPoint) &&
                  allDistrictsPoint?.map((province) => (
                    <option key={province.districtID} value={province.districtID}>
                      {province.name}
                    </option>
                  ))} */}
              </select>
            </Col>
            <Col xs={12} md={4}>
              <select
                className="form-select"
                onChange={(e) => {
                  // setWorkingAddress({
                  //   provinceID: workingAddress.provinceID,
                  //   communeID: e.target.value,
                  //   districtID: workingAddress.districtID,
                  // });
                  // setUrl(
                  //   `https://magicpost-uet.onrender.com/api/transactionPoint/customerGet/?provinceID=${workingAddress.provinceID}&districtID=${workingAddress.districtID}&communeID=${e.target.value}`
                  // );
                }}
                defaultValue={'Chọn Xã/Phường'}
              >
                <option value={0}>Chọn Xã/Phường</option>
                {/* {Array.isArray(allCommunePoint) &&
                  allCommunePoint?.map((province) => (
                    <option key={province.communeID} value={province.communeID}>
                      {province.name}
                    </option>
                  ))} */}
              </select>
            </Col>
            <Col>
              <select
                className="form-select"
                onChange={(e) => {
                  // employee.workingPointID = e.target.value;
                }}
                defaultValue={'Địa điểm làm việc'}
              >
                <option>Địa điểm làm việc</option>
                {/* {Array.isArray(transactionPoint) &&
                  transactionPoint?.map((province) => (
                    <option key={province.transactionPointID} value={province.transactionPointID}>
                      {province.name}
                    </option>
                  ))} */}
              </select>
            </Col>
          </Row>
        )}
        <Row>
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
