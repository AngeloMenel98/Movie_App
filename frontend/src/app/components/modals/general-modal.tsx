"use client";

import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
