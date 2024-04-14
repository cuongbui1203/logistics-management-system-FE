'use client';
import { Role, listUrl } from '@/config/Enum';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Col } from 'react-bootstrap';
import { FaTruckFast } from 'react-icons/fa6';
import envConfig from '@/envConfig';
import { useAppContext } from '@/app/app-provider';
import '@/css/dashboard/sidebar.css';

export interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export default function SideBar({ toggle, isOpen }: MenuToggleProps) {
  const route = useRouter();
  const pathname = usePathname();
  const { user } = useAppContext();
  const role = user?.role.name;
  console.log('role', role);

  const keyRole = role as keyof typeof Role;
  const listTabs = Role[keyRole]?.tabs;
  const listTabView = [];
  for (var i in listTabs) {
    let key = listTabs[i] as keyof typeof listUrl;
    listTabView.push(listUrl[key]);
  }
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME;

  return (
    <>
      <motion.div className="sidebar" id="mySidebar" exit={{ opacity: 0 }} data-is-open={isOpen}>
        <Link href="/dashboard" className="appName">
          <Col>
            <FaTruckFast size={'2em'} />
            {company}
          </Col>
        </Link>
        {listTabView?.map((link) => {
          return (
            <Link
              key={link.url}
              className={pathname == link.url ? 'bar-item button item-bar active' : 'bar-item button item-bar'}
              href={link.url}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </motion.div>
      <div
        style={{ height: '100vh', width: '2%', zIndex: '1' }}
        className="d-flex flex-column justify-content-center"
        id="toggle-zone"
      >
        <div
          style={{ height: '14vh', cursor: 'pointer' }}
          className="d-flex flex-column justify-content-center"
          onClick={toggle}
        >
          <div style={{ height: '40px', width: '100%' }} className="d-flex flex-row justify-content-center">
            <div id="menuToggle"></div>
          </div>
        </div>
      </div>
    </>
  );
}
