"use client";
import { cn } from "@/lib/utils";

// This is a Client Component — hover state is managed here via CSS transitions
export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto", className)}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-2xl group/bento transition-all duration-300 p-5 flex flex-col space-y-4 cursor-pointer",
                // CSS-only glass hover — no JS event handlers needed
                "bento-glass-item",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-1 transition duration-200">
                {icon && (
                    <span style={{ color: 'rgba(81,154,102,0.45)' }}>{icon}</span>
                )}
                <div className="font-bold mb-1 mt-2 text-base tracking-tight" style={{ color: '#519A66' }}>
                    {title}
                </div>
                <div className="font-normal text-xs leading-relaxed" style={{ color: 'rgba(81,154,102,0.60)' }}>
                    {description}
                </div>
            </div>
        </div>
    );
};
