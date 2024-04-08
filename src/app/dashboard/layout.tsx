'use client';
import { Container } from 'react-bootstrap';
import { AnimationSequence, motion, useAnimate } from 'framer-motion';
import SideBar from '@/components/dashboard/sidebar';
import TopBar from '@/components/dashboard/topbar';
import { useEffect, useState } from 'react';
import '@/css/dashboard/dashboard.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const isSmallScreen = window?.innerWidth <= 768 || false;
    const translationValue = isSmallScreen ? '-50vw' : '-15vw';
    const menuAnimations = isOpen
      ? [
          ['#mySidebar', { transform: 'translateX(0%)', opacity: 1 }, { at: '<' }],
          ['#toggle-zone', { transform: 'translateX(0%)' }, { at: '<' }],
        ]
      : [
          ['#mySidebar', { transform: 'translateX(-100%)', opacity: 0 }],
          ['#toggle-zone', { transform: `translateX(${translationValue})` }, { at: '<' }],
        ];

    animate(menuAnimations as AnimationSequence);
  }, [isOpen]);

  return (
    <motion.div ref={scope}>
      <SideBar toggle={() => setIsOpen(!isOpen)} isOpen />
      <motion.div id="main" data-is-open={isOpen}>
        <TopBar />
        <motion.section id="noidung" className="p-3">
          <Container>{children}</Container>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
