'use client';
import { Role, listUrl } from '@/types/Enum';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Col } from 'react-bootstrap';
import { FaTruckFast } from 'react-icons/fa6';
import '@/css/employee/sidebar.css';
import envConfig from '@/envConfig';
import { useAppContext } from '@/components/app-provider';

export default function SideBar() {
  const route = useRouter();
  const pathname = usePathname();
  const { user } = useAppContext();
  const role = user?.role.name;
  console.log('role', role);

  const keyRole = role as keyof typeof Role;
  const rightRole = Role[keyRole]?.right;
  const rightURL = [];
  for (var i in rightRole) {
    let key = rightRole[i] as keyof typeof listUrl;
    rightURL.push({ url: listUrl[key] });
  }
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME;

  return (
    <motion.div className="sidebar" id="mySidebar">
      <Link href="/dashboard" className="appName">
        <Col>
          <FaTruckFast size={'2em'} />
          {company}
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
