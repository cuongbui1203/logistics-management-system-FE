'use client';

import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import '@/css/pagination.css';

export default function Pagination({ totalPage }: { totalPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPage);

  return (
    <ul className="pagination d-flex justify-content-center mt-4">
      {currentPage > 1 && (
        <li className="page-item">
          <Link className="page-link" href={createPageURL(1)} aria-label="Previous" style={{ cursor: 'pointer' }}>
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
      )}
      {allPages.map((page) => {
        return (
          <li className="page-item" key={page}>
            {/* <button></button> */}
            <Link
              className={page != currentPage ? 'page-link' : 'page-link active'}
              href={createPageURL(page as number)}
            >
              {page}
            </Link>
          </li>
        );
      })}
      {currentPage < totalPage && (
        <li className="page-item">
          <Link
            href={createPageURL(currentPage + 1)}
            className="page-link"
            aria-label="Next"
            style={{ cursor: 'pointer' }}
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      )}
    </ul>
  );
}
