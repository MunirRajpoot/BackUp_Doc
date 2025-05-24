'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';

const variantStyles = {
  info: {
    bg: 'bg-blue-50 dark:bg-gray-800',
    text: 'text-blue-800 dark:text-blue-400',
    border: 'border-blue-300 dark:border-blue-800',
    hover: 'hover:bg-blue-200 dark:hover:bg-gray-700',
  },
  success: {
    bg: 'bg-green-50 dark:bg-gray-800',
    text: 'text-green-800 dark:text-green-400',
    border: 'border-green-300 dark:border-green-800',
    hover: 'hover:bg-green-200 dark:hover:bg-gray-700',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-gray-800',
    text: 'text-yellow-800 dark:text-yellow-400',
    border: 'border-yellow-300 dark:border-yellow-800',
    hover: 'hover:bg-yellow-200 dark:hover:bg-gray-700',
  },
  error: {
    bg: 'bg-red-50 dark:bg-gray-800',
    text: 'text-red-800 dark:text-red-400',
    border: 'border-red-300 dark:border-red-800',
    hover: 'hover:bg-red-200 dark:hover:bg-gray-700',
  },
};

export default function Alert({ message, linkText, linkHref = '#', variant = 'info' }) {
  const [visible, setVisible] = useState(true);
  const style = variantStyles[variant];

  if (!visible) return null;

  return (
    <div
      className={`flex items-center p-4 mb-4 border-t-4 ${style.bg} ${style.text} ${style.border}`}
      role="alert"
    >
      <Info className="w-4 h-4 shrink-0" />
      <div className="ms-3 text-sm font-medium">
        {message}
        {linkText && (
          <>
            {' '}
            <a href={linkHref} className="font-semibold underline hover:no-underline">
              {linkText}
            </a>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${style.hover} ${style.text}`}
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
