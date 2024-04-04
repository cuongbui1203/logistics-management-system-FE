'use client';

import { useEffect } from 'react';

/**
 * For client-side rendering, this component will load the Bootstrap JS bundle.
 * @returns null
 */
export default function BootstrapClient() {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return null;
}
