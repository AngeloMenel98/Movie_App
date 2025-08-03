// components/ui/Input.tsx
import React, { InputHTMLAttributes, forwardRef } from "react";
import {
  baseClasses,
  variantClasses,
  sizeClasses,
  shapeClasses,
  errorClasses,
} from "./inputStyle";

export type InputVariant = "outline" | "filled" | "flushed" | "unstyled";
export type InputSize = "sm" | "md" | "lg";
export type InputShape = "square" | "rounded" | "pill";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  htmlSize?: number;
  shape?: InputShape;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "md",
      htmlSize,
      shape = "rounded",
      error = false,
      errorMessage,
      label,
      labelClassName = "",
      containerClassName = "",
      className = "",
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block mb-1 text-sm font-medium ${error ? "text-red-600 dark:text-red-500" : "text-gray-700 dark:text-gray-300"} ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            size={htmlSize}
            className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${sizeClasses[size]}
            ${shapeClasses[shape]}
            ${error ? errorClasses : ""}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${className}
          `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
