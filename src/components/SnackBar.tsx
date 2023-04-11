import { useState, useEffect } from 'react';

interface SnackBarProps {
  message: string;
  theme: 'success' | 'danger' | 'warning';
  duration: number;
  isOpen: boolean;
}

const themes: Record<SnackBarProps['theme'], string> = {
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
};

function SnackBar({ message, theme, duration, isOpen }: SnackBarProps) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  return (
    <>
      {visible && (
        <button
          className={`absolute top-0 right-0 mt-7 mr-7 p-3 rounded-lg ${themes[theme]} text-white font-bold animate-zoomIn`}
          onClick={() => setVisible(false)}
        >
          {message}
        </button>
      )}
    </>
  );
}

export default SnackBar;
