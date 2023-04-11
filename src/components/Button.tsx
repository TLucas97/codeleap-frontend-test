import React from 'react';

type Props = {
  children: React.ReactNode;
  theme: 'primary' | 'success' | 'ghost' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
};

const themes = {
  primary: 'bg-primary text-white border border-transparent',
  success: 'bg-success text-white border border-transparent',
  ghost: 'bg-ghost border border-black text-black',
  danger: 'bg-danger text-white border border-transparent',
};

function Button({ children, theme, disabled, onClick }: Props) {
  if (disabled) {
    return (
      <div className="z-10 cursor-not-allowed">
        <button
          className={`w-[120px] h-[32px] rounded-[8px] font-semibold text-[16px] hover:opacity-70 transition ease-in-out bg-sand text-white border border-transparent opacity-70 pointer-events-none`}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <button
      className={`w-[120px] h-[32px] rounded-[8px] font-semibold text-[16px] hover:opacity-70 transition ease-in-out ${themes[theme]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
