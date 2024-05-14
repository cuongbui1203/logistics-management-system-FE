'use client';
import { Role, listUrl } from '@/config/Enum';
import { motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Col } from 'react-bootstrap';
import { FaTruckFast } from 'react-icons/fa6';
import envConfig from '@/envConfig';
import { useAppContext } from '@/app/app-provider';
import style from '@/css/dashboard/sidebar.module.css';

const sidebarVariants = {
  open: {
    display: 'block',
    opacity: 1,
    x: 0,
    at: '<',
  },
  closed: {
    x: '-100%',
    display: 'none',
  },
};

const toggleVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: '1vw',
    at: '<',
  },
};

export default function SideBar() {
  const pathname = usePathname();
  const { user } = useAppContext();
  const role = user?.role.name;
  console.log('role', role);

  const listTabs = Role[role as keyof typeof Role]?.tabs;
  const listTabView = [];
  for (const i in listTabs) {
    const key = listTabs[i] as keyof typeof listUrl;
    listTabView.push(listUrl[key]);
  }
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME;

  const [isOpen, toggleOpen] = useCycle(true, false);

  return (
    <motion.div className={style.container}>
      <motion.div
        className={style.sidebar}
        data-is-open={isOpen}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <Link href="/dashboard" className={style.appName}>
          <Col>
            <FaTruckFast size={'2em'} />
            {company}
          </Col>
        </Link>
        {listTabView?.map((link) => {
          return (
            <Link
              key={link.url}
              className={pathname == link.url ? `${style.barItem} ${style.active}` : `${style.barItem}`}
              href={link.url}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </motion.div>
      <motion.div variants={toggleVariants} animate={isOpen ? 'open' : 'closed'} className={style.toggleZone}>
        <div
          style={{ height: '14vh', cursor: 'pointer' }}
          className="d-flex flex-column justify-content-center"
          onClick={() => toggleOpen()}
        >
          <div style={{ height: '40px', width: '100%' }} className="d-flex flex-row justify-content-center">
            <div id={style.menuToggle}></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
