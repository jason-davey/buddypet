import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-12 w-full bg-[#F5F5F5] px-4 py-3 border rounded appearance-none shadow-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-500 leading-6 placeholder:text-charcoal placeholder:text-opacity-50 text-base disabled:bg-background/50 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
