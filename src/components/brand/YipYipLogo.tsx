
import { cn } from '@/lib/utils';
import { BRAND_FONTS } from '@/lib/branding';

interface YipYipLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'text' | 'gradient' | 'outline';
  className?: string;
  animate?: boolean;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-6xl',
};

const variantClasses = {
  text: 'text-[#FDBD34]',
  gradient: 'gradient-text',
  outline: 'text-transparent bg-gradient-to-r from-[#FDBD34] to-[#e4a721] bg-clip-text stroke-[#FDBD34] stroke-2',
};

const YipYipLogo = ({ 
  size = 'md', 
  variant = 'gradient', 
  className,
  animate = false 
}: YipYipLogoProps) => {
  return (
    <span 
      className={cn(
        BRAND_FONTS.logo,
        sizeClasses[size],
        variantClasses[variant],
        animate && 'animate-pulse',
        'select-none tracking-wider font-black uppercase',
        className
      )}
    >
      YipYip
    </span>
  );
};

export default YipYipLogo;
