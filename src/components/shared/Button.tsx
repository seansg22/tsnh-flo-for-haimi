interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}

export function Button({ children, onClick, type = 'button', variant = 'primary', disabled, className = '' }: ButtonProps) {
  const base = 'rounded-full py-3 px-8 font-bold text-base transition-all active:scale-95 disabled:opacity-50';
  const variants = {
    primary: 'bg-peach text-white shadow-md',
    outline: 'border-2 border-peach text-peach bg-transparent',
    ghost: 'text-peachDark bg-transparent',
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
