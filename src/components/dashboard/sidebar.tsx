import { Role, listUrl } from '@/types/Enum';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { FaTruckFast } from 'react-icons/fa6';
import '@/css/employee/sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SideBar() {
  const route = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState('true');
  const role = 'Admin';
  const keyRole = role as keyof typeof Role;
  const rightRole = Role[keyRole]?.right;
  const rightURL = [];
  for (var i in rightRole) {
    let key = rightRole[i] as keyof typeof listUrl;
    rightURL.push({ url: listUrl[key] });
  }

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
          Company Name
        </Col>
      </Link>
      {rightURL?.map((link) => {
        return (
          <div
            key={link.url.url}
            className={pathname == link.url.url ? 'bar-item button item-bar active' : 'bar-item button item-bar'}
            onClick={() => {
              route.push(link.url.url);
            }}
          >
            {link.url.icon}
            {link.url.name}
          </div>
        );
      })}
    </motion.div>
  );
}
