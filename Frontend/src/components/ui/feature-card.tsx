
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from '@/components/animations/AnimatedText';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  animationType?: 'focus' | 'float' | 'shiny' | 'blur' | 'split' | 'velocity';
}

const FeatureCard = ({
  title,
  description,
  icon,
  className,
  animationType = 'focus',
}: FeatureCardProps) => {
  return (
    <div className={cn(
      'relative group p-6 rounded-xl bg-white border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 glow-card',
      className
    )}>
      <div className="flex flex-col gap-4">
        <div className="p-2 rounded-full bg-virtlab-softblue/30 w-12 h-12 flex items-center justify-center text-virtlab-blue">
          {icon}
        </div>
        
        <AnimatedText 
          text={title} 
          tag="h3" 
          className="text-xl font-bold mb-2" 
          animationType={animationType} 
          threshold={0.5}
        />
        
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
