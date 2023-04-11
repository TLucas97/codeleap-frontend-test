import { useState } from 'react';

interface Props {
  onClick: () => void;
}

function ToggleSwitch({ onClick }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label htmlFor="toggleTwo" className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          id="toggleTwo"
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
          onClick={onClick}
        />
        <div
          className={`border-2 border-white block h-6 w-12 rounded-full ${isChecked ? 'bg-primary' : 'bg-sand'}`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
            isChecked ? 'translate-x-6' : ''
          }`}
        ></div>
      </div>
    </label>
  );
}

export default ToggleSwitch;
