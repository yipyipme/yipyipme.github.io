
import DoveIcon from './DoveIcon';
import { cn } from '@/lib/utils';

interface BrandedSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BrandedSpinner = ({ size = 'md', className }: BrandedSpinnerProps) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <DoveIcon 
        size={size} 
        animate 
        className="animate-spin text-[#FDBD34]" 
      />
    </div>
  );
};

export default BrandedSpinner;
