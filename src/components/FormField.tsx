type FormFieldProps = {
  label: string;
  value: string;
  isTextarea?: boolean;
  onChange: (value: string) => void;
};

function FormField({ label, onChange, value, isTextarea = false }: FormFieldProps) {
  if (isTextarea) {
    return (
      <div className="relative">
        <label className="text-[16px]">{label}</label>
        <textarea
          className="z-20 block h-[80px] w-full text-sm bg-transparent rounded-[8px] appearance-none focus:outline-none focus:ring-0 peer border-[1px] border-deeperSand px-2 py-1 resize-none"
          placeholder=" "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <label className="text-[16px]">{label}</label>
      <input
        type="text"
        className="z-20 block h-[32px] w-full text-sm bg-transparent rounded-[8px] appearance-none focus:outline-none focus:ring-0 peer border-[1px] border-deeperSand px-2"
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default FormField;
