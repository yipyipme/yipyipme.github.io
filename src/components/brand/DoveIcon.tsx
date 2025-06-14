
import { cn } from '@/lib/utils';

interface DoveIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'outline';
  className?: string;
  animate?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const DoveIcon = ({ 
  size = 'md', 
  variant = 'filled', 
  className,
  animate = false 
}: DoveIconProps) => {
  return (
    <svg
      className={cn(
        sizeClasses[size],
        'text-[#FDBD34]',
        animate && 'animate-float',
        className
      )}
      viewBox="0 0 24 24"
      fill={variant === 'filled' ? 'currentColor' : 'none'}
      stroke={variant === 'outline' ? 'currentColor' : 'none'}
      strokeWidth={variant === 'outline' ? 2 : 0}
    >
      <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5.5 2.9 1.3 4L12 22l4.7-10c.8-1.1 1.3-2.5 1.3-4 0-3.5-2.5-6-6-6z"/>
      <circle cx="12" cy="8" r="2"/>
    </svg>
  );
};

export default DoveIcon;
