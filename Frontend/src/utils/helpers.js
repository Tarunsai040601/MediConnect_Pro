import Swal from 'sweetalert2';

export const showSuccess = (title, text = '') => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#0ea5e9',
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showError = (title, text = '') => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#0ea5e9',
  });
};

export const showConfirm = (title, text = '') => {
  return Swal.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: '#0ea5e9',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Yes, proceed',
    cancelButtonText: 'Cancel',
  });
};

export const showInfo = (title, text = '') => {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    confirmButtonColor: '#0ea5e9',
  });
};

export const showWarning = (title, text = '') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#0ea5e9',
  });
};

export const showLoading = (title = 'Processing...') => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });
};

export const closeAlert = () => Swal.close();

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return days;
};

export const getStatusColor = (status) => {
  const colors = {
    confirmed: '#10b981',
    pending: '#f59e0b',
    completed: '#0ea5e9',
    cancelled: '#ef4444',
  };
  return colors[status] || '#64748b';
};
