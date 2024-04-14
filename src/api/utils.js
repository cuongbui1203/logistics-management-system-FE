/**
 * Defines good status information.
 *
 * @type {Object}
 */
export const goodStatus = {
  delivered: { now: 'Đã giao', color: 'success' },
  delivering: { now: 'Đang vận chuyển', color: 'warning' },
};

/**
 * Defines employee status information.
 *
 * @type {Object}
 */
export const employeeStatus = {
  ACTIVE: { name: 'Hoạt động', color: 'success' },
  INACTIVE: { name: 'Đã nghỉ', color: 'secondary' },
};

/**
 * Defines error messages based on error codes.
 *
 * @type {Object}
 */
export const createError = {
  10003: 'Nội dung không hợp lệ',
  10004: 'Địa chỉ không hợp lệ',
  10005: 'Mã nhân viên không hợp lệ',
  10007: 'Số CCCD trùng lặp (Số CCCD đã được đăng ký trước đó)',
  10008: 'Mã đơn hàng không hợp lệ',
  10009: 'Mật khẩu không hợp lệ',
  10012: 'Ngày tháng không hợp lệ',
  10024: 'Địa chỉ khách hàng chưa được hỗ trợ',
};
