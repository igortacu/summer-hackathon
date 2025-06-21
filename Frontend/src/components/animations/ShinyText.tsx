
import React from 'react';
import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  className?: string;
  gradient?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  className,
  gradient = 'from-virtlab-blue via-blue-300 to-virtlab-blue'
}) => {
  return (
    <span 
      className={cn(
        'inline-block bg-gradient-to-r bg-clip-text text-transparent bg-300% animate-shine',
        gradient,
        className
      )}
    >
      {text}
    </span>
  );
};

export default ShinyText;
