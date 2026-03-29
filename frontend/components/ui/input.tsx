import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full px-3 py-2 text-sm font-medium",
                    "border-0 border-b",
                    "rounded-none bg-transparent",
                    "transition-all duration-200",
                    "disabled:opacity-50",
                    className
                )}
                style={{
                    color: '#519A66',
                    borderBottomColor: 'rgba(81,154,102,0.30)',
                    background: 'rgba(254,250,224,0.20)',
                    outline: 'none',
                }}
                onFocus={e => {
                    e.target.style.borderBottomColor = '#519A66';
                    e.target.style.background = 'rgba(254,250,224,0.40)';
                }}
                onBlur={e => {
                    e.target.style.borderBottomColor = 'rgba(81,154,102,0.30)';
                    e.target.style.background = 'rgba(254,250,224,0.20)';
                }}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
