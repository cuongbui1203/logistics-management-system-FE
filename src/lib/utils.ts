import moment from 'moment';

/**
 * Formats a date in the specified format.
 *
 * @param {string} dateTime - The date and time to format.
 * @returns {string} - The formatted date.
 */
export function formatDate(dateTime: Date) {
  return new Date(moment(dateTime).format('YYYY-MM-DD').replace(/-/g, ''));
}
