
export const baseClasses = `
  w-full
  transition-all
  duration-200
  focus:outline-none
  disabled:opacity-60
  disabled:cursor-not-allowed
  read-only:opacity-80
  read-only:cursor-default
`;

export const variantClasses = {
  outline: `
    border
    border-gray-300
    focus:border-blue-500
    focus:ring-1
    focus:ring-blue-500
    bg-white
    dark:bg-gray-800
    dark:border-gray-600
    dark:focus:border-blue-500
    dark:focus:ring-blue-500
  `,
  filled: `
    border
    border-transparent
    bg-gray-100
    hover:bg-gray-200
    focus:bg-white
    focus:border-blue-500
    focus:ring-1
    focus:ring-blue-500
    dark:bg-gray-700
    dark:hover:bg-gray-600
    dark:focus:bg-gray-800
    dark:focus:border-blue-500
  `,
  flushed: `
    border-b
    border-gray-300
    focus:border-blue-500
    bg-transparent
    rounded-none
    dark:border-gray-600
    dark:focus:border-blue-500
  `,
  unstyled: `
    border-none
    bg-transparent
    focus:ring-0
  `,
};

export const sizeClasses = {
  sm: 'py-1.5 px-2.5 text-sm',
  md: 'py-2 px-3 text-base',
  lg: 'py-3 px-4 text-lg',
};

export const shapeClasses = {
  square: 'rounded-none',
  rounded: 'rounded-md',
  pill: 'rounded-full',
};

export const errorClasses = `
  border-red-500
  focus:border-red-500
  focus:ring-red-500
  dark:border-red-500
  dark:focus:border-red-500
`;