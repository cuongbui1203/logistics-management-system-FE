'use client';
import { useAppContext } from '@/app/app-provider';
import Image from 'next/image';
import React from 'react';
import { Row } from 'react-bootstrap';

export default function Preview() {
  const { user } = useAppContext();

  return (
    <div className="formContainer">
      <Row className="d-flex justify-content-center align-items-center ">
        <Image alt="avatar" src="/avatar.jpg" width={320} height={320} className="w-75 rounded-circle" />
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-3 text-center">
        Chức vụ: {user?.role.name || 'Không xác định'}
      </Row>
      <Row className="d-flex justify-content-center align-items-center text-center">
        Địa điểm công tác: {user?.work_plate?.name || 'Không xác định'}
      </Row>
    </div>
  );
}
