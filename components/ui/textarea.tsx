import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-[80px] w-full bg-[#F5F5F5] px-4 py-3 border rounded appearance-none shadow-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-500 leading-6 placeholder:text-charcoal placeholder:text-opacity-50 text-base disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
