import moment from 'moment';
import { UseFormSetError } from 'react-hook-form';
import { EntityError } from './http';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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
  message,
  duration,
}: {
  error: any;
  setError: UseFormSetError<any>;
  message?: string;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.error.forEach((err) => {
      setError(err.field, {
        type: 'manual',
        message: err.message[0],
      });
    });
  } else {
    toast.error(message || error.payload.message || 'Yêu cầu thất bại!', {
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

export const formatDateTime = (date: Date | null | undefined) => {
  if (!date) {
    return '';
  }
  return dayjs(date).format('HH:mm DD-MM-YYYY');
};

export function timestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function timestampToDateTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
