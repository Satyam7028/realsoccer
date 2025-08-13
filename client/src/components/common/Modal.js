// client/src/components/common/Modal.js

import React, { useEffect, useRef } from 'react';
// The IoClose icon from react-icons/io5 is a clean and simple replacement
// for a close button in a modal.
import { IoClose } from 'react-icons/io5';

// The Modal component takes `isOpen`, `onClose`, `title`, and `children` as props.
const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef();

  // This effect handles closing the modal when the user clicks outside of it
  // or presses the Escape key.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Cleanup function to remove event listeners when the component unmounts
    // or the modal is closed.
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // If the modal is not open, it returns null and renders nothing.
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative"
      >
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {/* Close button with the new react-icons icon */}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>
        <div className="py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
