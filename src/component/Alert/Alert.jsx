import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react'; // You can use any icon library or SVG

const variantStyles = {
  info: 'text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800',
  warning: 'text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:bg-gray-800 dark:border-yellow-800',
  success: 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800',
  error: 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800',
};

const Alert = ({ message, variant = 'info', onClose }) => {
  return (
    <div className={`flex items-center p-4 mb-4 text-sm ${variantStyles[variant]}`} role="alert">
      <svg className="shrink-0 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 font-medium">{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-opacity-20 focus:ring-2 focus:ring-opacity-50"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
  onClose: PropTypes.func,
};

export default Alert;
