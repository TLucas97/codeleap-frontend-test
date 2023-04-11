import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  size?: 'small' | 'medium';
  isOn: boolean;
  loading?: boolean;
}

function Modal({ children, size = 'small', isOn }: ModalProps) {
  return (
    <>
      {isOn && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div
            className={`bg-ghost rounded-[16px] w-[90%] card:w-[660px] border-2 z-50 ${
              size === 'small' ? 'card:h-[146px]' : 'h-[334px]'
            } border border-sand animate-zoomIn`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
