// utils/buttonStyles.ts
export const baseClasses = `
  inline-flex items-center justify-center
  font-medium transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
  disabled:opacity-60 disabled:cursor-not-allowed
`;

export const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
  success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
  outline: 'border border-current bg-transparent hover:bg-opacity-10',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
};

export const sizeClasses = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};

export const shapeClasses = {
  square: 'rounded-none',
  rounded: 'rounded-md',
  pill: 'rounded-full',
};

export const spinnerClasses = 'animate-spin -ml-1 mr-2 h-4 w-4';