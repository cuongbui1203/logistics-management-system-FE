'use client';
import { useAppContext } from '@/components/app-provider';
import React from 'react';
import { Row } from 'react-bootstrap';

export default async function Preview() {
  const { user } = useAppContext();

  return (
    <div className="formContainer">
      <Row className="d-flex justify-content-center align-items-center ">
        <img alt="avatar" src="/avatar.png" className="w-75 rounded-circle" />
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-3 text-center">
        Chức vụ: {user?.role.name || 'Không xác định'}
      </Row>
      <Row className="d-flex justify-content-center align-items-center text-center">
        {/* Địa điểm công tác: {locationDetails} */}
        Địa điểm công tác: "Không xác định"
      </Row>
    </div>
  );
}
