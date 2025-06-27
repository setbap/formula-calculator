import * as React from "react";

import { cn, handleInputFocus, handleTextareaChange } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, onFocus, onChange, onMouseDown, ...props }, ref) => {
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    handleInputFocus(e);

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (target === document.activeElement) {
      setTimeout(() => {
        target.select();
      }, 0);
    }

    if (onMouseDown) {
      onMouseDown(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleTextareaChange(e, onChange);
  };

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      onFocus={handleFocus}
      onMouseDown={handleMouseDown}
      onChange={handleChange}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
