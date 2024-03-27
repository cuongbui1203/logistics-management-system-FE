'use client';
import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAnimate } from 'framer-motion';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/css/employee/employee-page.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div>
      <p>SideBar</p>
      <p>TopBar</p>
      <motion.div id="main">
        <p>TopBar</p>
        <motion.section id="noidung" className="p-3">
          <Container>{children}</Container>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
