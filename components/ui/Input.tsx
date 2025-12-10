// components/ui/Input.tsx

import { InputHTMLAttributes, forwardRef, ElementType } from 'react';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons'; // Import IconType for type safety

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  // Added icon support as used in the previous component update
  icon?: IconType; 
  // Added a theme prop for explicit control, though we default to dark here
  theme?: 'light' | 'dark'; 
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, icon: Icon, theme = 'dark', ...props }, ref) => {
    
    // Define base styles for dark theme
    const baseInputStyles = 
      'bg-gray-800 text-gray-100 border-gray-700 placeholder:text-gray-500';

    // Define focus styles using Amber
    const focusStyles = 
      'focus:ring-amber-500 focus:border-amber-500';

    // Define container class based on if an icon is present
    const containerClasses = Icon ? 'relative' : '';
    const inputPadding = Icon ? 'pl-11 pr-4' : 'px-4';

    return (
      <div className={cn("w-full", containerClasses)}>
        {label && (
          // Label text is light gray for dark theme
          <label className="block text-sm font-medium text-gray-300 mb-1"> 
            {label}
            {props.required && <span className="text-amber-500 ml-1">*</span>} 
          </label>
        )}
        
        {/* Icon Display */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pt-6 pointer-events-none">
            {/* Icon color is amber or error red */}
            <Icon 
              className={cn(
                "h-5 w-5",
                error ? 'text-red-500' : 'text-amber-500' 
              )} 
              aria-hidden="true" 
            />
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            'w-full py-2.5 border rounded-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            
            // Apply Dark/Amber styling
            baseInputStyles,
            focusStyles,
            
            // Adjust padding for icon, if present
            inputPadding, 
            
            // Error border logic
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' // Keep red for error
              : 'border-gray-700',
              
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;