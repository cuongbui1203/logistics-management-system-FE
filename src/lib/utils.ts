import moment from 'moment';
import { UseFormSetError } from 'react-hook-form';
import { EntityError } from './http';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { UserWithoutWordplateType } from '@/schema/auth.schema';
import { UserSchemaType } from '@/schema/common.schema';

/**
 * Formats a date in the specified format.
 *
 * @param {string} dateTime - The date and time to format.
 * @returns {string} - The formatted date.
 */
export function formatDate(dateTime: Date) {
  return new Date(moment(dateTime).format('YYYY-MM-DD').replace(/-/g, ''));
}

/**
 * Generates a pagination array based on the current page and total number of pages.
 *
 * @param {number} currentPage - The current active page.
 * @param {number} totalPages - The total number of pages.
 * @returns {Array<number|string>} - An array representing the pagination items.
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    Object.keys(error.payload.error).forEach((key) => {
      setError(key, {
        type: 'manual',
        message: error.payload.error[key].join(' '),
      });
    });
  } else {
    toast.error('Yêu cầu thất bại!', {
      autoClose: duration || 3000,
    });
  }
};

export const formatDate2 = (date: Date | null | undefined) => {
  if (!date) {
    return '';
  }
  return dayjs(date).format('YYYY-MM-DD');
};
