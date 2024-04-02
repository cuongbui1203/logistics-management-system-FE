'use client';
import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAnimate } from 'framer-motion';
import { motion } from 'framer-motion';
import SideBar from '@/components/dashboard/sidebar';
import MenuToggle from '@/components/dashboard/menutoggle';
import TopBar from '@/components/dashboard/topbar';
import '@/css/employee/employee-page.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div>
      <SideBar />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      <motion.div id="main">
        <TopBar />
        <motion.section id="noidung" className="p-3">
          <Container>{children}</Container>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
