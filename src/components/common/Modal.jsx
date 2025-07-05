import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// Built-in class merger function
const mergeClasses = (...classes) => {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const Modal = ({
  isOpen = true,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  showHeader = true,
  ...props
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
      
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full',
  };

  const overlayClasses = mergeClasses(
    'fixed inset-0 z-50 flex items-center justify-center',
    'bg-black bg-opacity-50 backdrop-blur-sm',
    'animate-fadeIn',
    overlayClassName
  );

  const contentClasses = mergeClasses(
    'relative w-full mx-4 bg-white rounded-lg shadow-xl',
    'transform transition-all duration-300',
    'animate-slideIn',
    sizes[size] || sizes.md,
    contentClassName
  );

  const modalClasses = mergeClasses(
    'flex flex-col max-h-[90vh]',
    className
  );

  const modalContent = (
    <div
      className={overlayClasses}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div className={contentClasses}>
        <div 
          ref={modalRef}
          className={modalClasses}
          tabIndex={-1}
          {...props}
        >
          {/* Modal Header - only show if title exists and showHeader is true */}
          {title && showHeader && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              )}
            </div>
          )}
          
          {/* Modal Body - Direct children rendering for flexibility */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal in a portal to avoid z-index issues
  return createPortal(modalContent, document.body);
};

// Modal components for better composition
const ModalHeader = ({ children, className = '' }) => (
  <div className={mergeClasses('p-4 border-b border-gray-200', className)}>
    {children}
  </div>
);

const ModalBody = ({ children, className = '' }) => (
  <div className={mergeClasses('flex-1 p-4 overflow-y-auto', className)}>
    {children}
  </div>
);

const ModalFooter = ({ children, className = '' }) => (
  <div className={mergeClasses('p-4 border-t border-gray-200 flex justify-end space-x-2', className)}>
    {children}
  </div>
);

// Export all components
export default Modal;
export { ModalHeader, ModalBody, ModalFooter };
