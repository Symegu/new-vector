// components/ui/checkbox.tsx
'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from './utils';

type CheckboxProps = {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function Checkbox({
  checked,
  onCheckedChange,
  id,
  className,
  disabled = false,
  children,
}: CheckboxProps) {
  return (
    <label className={cn('flex items-center space-x-2 cursor-pointer select-none', className)}>
      <div
        className={cn(
          'h-4 w-4 shrink-0 rounded-sm border-2 transition-colors flex items-center justify-center',
          checked
            ? 'bg-blue-500 border-blue-500'
            : 'bg-white border-slate-200 hover:border-slate-300',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled && onCheckedChange) onCheckedChange(!checked);
        }}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled && onCheckedChange) onCheckedChange(!checked);
          }
        }}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
      {children && <span className="text-sm">{children}</span>}
    </label>
  );
}
