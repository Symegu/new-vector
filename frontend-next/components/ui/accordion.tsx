'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from './utils'

type AccordionType = 'single' | 'multiple'

interface AccordionContextValue {
  type: AccordionType
  value: string | string[] | undefined
  onChange: (val: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType
  collapsible?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[] | undefined) => void
}

export function Accordion({
  type = 'single',
  collapsible = false,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | string[] | undefined
  >(defaultValue)

  const currentValue = isControlled ? controlledValue : uncontrolledValue

  const handleChange = (val: string) => {
    if (type === 'single') {
      const newValue =
        currentValue === val
          ? collapsible
            ? undefined
            : val
          : val
      if (!isControlled) setUncontrolledValue(newValue)
      onValueChange?.(newValue)
    } else {
      // multiple
      const arr = Array.isArray(currentValue) ? currentValue : []
      const exists = arr.includes(val)
      const newArr = exists ? arr.filter((v) => v !== val) : [...arr, val]
      if (!isControlled) setUncontrolledValue(newArr)
      onValueChange?.(newArr)
    }
  }

  const ctx: AccordionContextValue = {
    type,
    value: currentValue,
    onChange: handleChange,
  }

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function useAccordionItemState(itemValue: string) {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within <Accordion>')
  }

  const { type, value, onChange } = context
  const isOpen =
    type === 'single'
      ? value === itemValue
      : Array.isArray(value) && value.includes(itemValue)

  const toggle = () => onChange(itemValue)

  return { isOpen, toggle }
}

interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <div
      className={cn('rounded-none last:border-b-0', className)}
      data-value={value}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        if (React.isValidElement<{ itemValue?: string }>(child)) {
          return React.cloneElement(child, { itemValue: value });
        }
        return child;
      })}
    </div>
  )
}

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemValue?: string
}

export function AccordionTrigger({
  itemValue,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { isOpen, toggle } = useAccordionItemState(itemValue || '')

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'w-full flex items-center justify-between py-3 text-base font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        className
      )}
      aria-expanded={isOpen}
      {...props}
    >
      <span className="pr-6 text-left">{children}</span>
      <ChevronDown
        className={cn(
          'h-5 w-5 text-slate-400 transition-transform duration-200',
          isOpen && 'rotate-180 text-blue-500'
        )}
      />
    </button>
  )
}

interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  itemValue?: string
}

export function AccordionContent({
  itemValue,
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItemState(itemValue || '')

  return (
    <div
      className={cn(
        'grid overflow-hidden text-sm text-slate-600 transition-all duration-200 ease-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        className
      )}
      aria-hidden={!isOpen}
      {...props}
    >
      <div className="overflow-hidden pb-3">
        {children}
      </div>
    </div>
  )
}
