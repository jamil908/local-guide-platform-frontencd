// components/ui/card.tsx (Black & Amber Theme)

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        // === BASE CARD STYLES (Black Background, Amber Border) ===
        'bg-gray-900 rounded-xl shadow-lg border border-amber-800 text-gray-100', // Deep black background, dark amber border
        
        // === AMBER HOVER EFFECT ===
        hover && 'hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300', 
        
        className
      )}
    >
      {children}
    </div>
  );
}
Card.displayName = 'Card';


export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
        // Amber separator line
        'p-6 border-b border-amber-700', 
        className
    )}>
      {children}
    </div>
  );
}
CardHeader.displayName = 'CardHeader';


export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
        'p-6',
        className
    )}>
      {children}
    </div>
  );
}
CardBody.displayName = 'CardBody';


export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
        // Dark amber/black footer background and amber top border
        'p-6 border-t border-amber-700 bg-black/50 rounded-b-xl', 
        className
    )}>
      {children}
    </div>
  );
}
CardFooter.displayName = 'CardFooter';
