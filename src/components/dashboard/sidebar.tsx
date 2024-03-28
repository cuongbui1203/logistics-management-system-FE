import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { FaTruckFast } from 'react-icons/fa6';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState('true');

  const show = {
    opacity: 1,
    display: 'block',
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  };

  return (
    <motion.div animate={isOpen ? show : hide} className="sidebar" id="mySidebar" exit={{ opacity: 0 }}>
      <Link href="/dashboard" className="appName">
        <Col>
          <FaTruckFast size={'2em'} />
          MAGIC POST
        </Col>
      </Link>
    </motion.div>
  );
}
