// components/ui/DarkCard.tsx (using DarkCard as the name for the exported component)
// NOTE: I am assuming you will rename your file from car2.tsx to DarkCard.tsx for clarity.

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DarkCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function DarkCard({ children, className, hover = true, ...props }: DarkCardProps) {
  // Base background: Deep black/dark gray. Border: Subtle Amber. Text: Light.
  const baseStyle = 'bg-gray-900 rounded-xl shadow-lg border border-amber-800 text-gray-100'; 
  
  // Hover effect: Amber shadow and Amber border
  const hoverStyle = hover 
    ? 'hover:shadow-amber-500/30 hover:border-amber-500 transition-all duration-300' 
    : '';
  
  return (
    <div 
      className={cn(
        baseStyle,
        hoverStyle,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
DarkCard.displayName = 'DarkCard';

// DarkCardHeader - Amber bottom border
export function DarkCardHeader({ children, className }: { children: ReactNode; className?: string }) {
    return (
      // Use Amber for the border line
      <div className={cn('p-6 border-b border-amber-700', className)}> 
          {children}
      </div>
    );
}
DarkCardHeader.displayName = 'DarkCardHeader';

// DarkCardBody - No change needed
export function DarkCardBody({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('p-6', className)}>
            {children}
        </div>
    );
}
DarkCardBody.displayName = 'DarkCardBody';

export default DarkCard;