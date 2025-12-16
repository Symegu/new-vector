"use client";

import * as React from "react";
import { cn } from "./utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700",
        className
      )}
      {...props}
    />
  );
}
