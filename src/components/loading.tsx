'use client';
import { motion, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import envConfig from '@/envConfig';
import '@/css/loading.css';

export default function Loading() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const containerWidth = document.querySelector('.container')?.clientWidth || window.innerWidth;
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: '100%' }],
          [scope.current, { x: containerWidth, width: '0%' }, { delay: 0.3 }],
        ],
        {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.8,
        }
      );
    };
    animateLoader();
  }, [animate, scope]);
  // const isSmallScreen = window ? window.innerWidth <= 768 : false; // Set your breakpoint as needed
  const isSmallScreen = false;
  const endX = isSmallScreen ? 100 : 300;
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME;
  return (
    <div id="loading">
      <div className="containerLoading">
        <h1 className="text">
          <i>{company}</i>
        </h1>
        <motion.div animate={{ x: endX }} transition={{ ease: 'easeOut', duration: 2 }} className="icon">
          <FaShippingFast size={'4em'} />
        </motion.div>
        <motion.div ref={scope} className="loader" />
      </div>
    </div>
  );
}
