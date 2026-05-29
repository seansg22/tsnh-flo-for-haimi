interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export function TextInput({ value, onChange, placeholder, className = '' }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`rounded-xl border-2 border-peachLight focus:border-peach outline-none px-4 py-3 w-full text-app-text bg-cream text-base font-medium transition-colors ${className}`}
    />
  );
}
