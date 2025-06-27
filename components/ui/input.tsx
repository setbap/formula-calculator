import { cn, handleInputFocus, handleInputChange } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onFocus, onChange, onMouseDown, ...props }, ref) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Select all text on focus
      handleInputFocus(e);

      // Call the original onFocus if provided
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      // Select all text on mouse down (for click events)
      const target = e.target as HTMLInputElement;
      if (target === document.activeElement) {
        // If already focused, select all text
        setTimeout(() => {
          target.select();
        }, 0);
      }

      // Call the original onMouseDown if provided
      if (onMouseDown) {
        onMouseDown(e);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Convert Persian numbers to English and call original onChange
      handleInputChange(e, onChange);
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        onMouseDown={handleMouseDown}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
