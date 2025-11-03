import { forwardRef, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium';
    const variantStyles =
      variant === 'primary'
        ? 'bg-brand-500 text-white hover:bg-brand-600 focus-visible:outline-brand-500'
        : 'border border-brand-200 text-brand-700 hover:bg-brand-50';

    return (
      <button ref={ref} className={clsx(baseStyles, variantStyles, className)} {...props} />
    );
  }
);

Button.displayName = 'Button';
