
import { Button } from '@/components/ui/button';
import YipYipLogo from './YipYipLogo';
import DoveIcon from './DoveIcon';
import { cn } from '@/lib/utils';

interface BrandedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  showLogo?: boolean;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

const BrandedButton = ({ 
  children, 
  variant = 'primary',
  showLogo = false,
  showIcon = false,
  className,
  onClick 
}: BrandedButtonProps) => {
  const variantClasses = {
    primary: 'gradient-bg text-black hover:opacity-90',
    secondary: 'bg-[#FDBD34]/10 text-[#FDBD34] border border-[#FDBD34]/30 hover:bg-[#FDBD34]/20',
    outline: 'border-[#FDBD34] text-[#FDBD34] hover:bg-[#FDBD34] hover:text-black',
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        'btn-modern font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {showIcon && <DoveIcon size="sm" className="mr-2" />}
      {children}
      {showLogo && <YipYipLogo size="sm" className="ml-2" />}
    </Button>
  );
};

export default BrandedButton;
