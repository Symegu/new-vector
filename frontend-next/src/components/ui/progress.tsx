"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "./utils";

// ✅ Расширьте типы явно
interface ProgressProps {
  className?: string;
  value?: number;
}

const Progress = React.forwardRef<
  HTMLDivElement, // ✅ Явный тип ref
  ProgressProps  // ✅ Собственные props
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-slate-200",
      className
    )}
    {...props}
    value={value} // ✅ Передача value наверх
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-blue-600 transition-all rounded-full"
      style={{ width: `${value}%` }} // ✅ Простой width
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = "Progress";

export { Progress };
