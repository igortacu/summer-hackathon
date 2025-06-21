
import React from 'react';
import { cn } from "@/lib/utils";
import { Badge as LucideBadge } from 'lucide-react';
import { ProgressCircle } from '../ui/progress-circle';

export interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  achieved: boolean;
  className?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  name,
  description,
  icon,
  progress,
  maxProgress,
  achieved,
  className,
}) => {
  const progressPercentage = Math.min(100, (progress / maxProgress) * 100);
  
  return (
    <div className={cn(
      "relative group",
      "flex flex-col items-center p-6 rounded-xl transition-all duration-300",
      achieved ? "bg-gradient-to-br from-virtlab-blue/10 to-virtlab-yellow/20" : "bg-muted/50",
      "hover:shadow-lg hover:-translate-y-1",
      className
    )}>
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center mb-3",
        "transition-all duration-300",
        achieved 
          ? "bg-gradient-to-br from-virtlab-blue to-blue-500 text-white shadow-lg shadow-virtlab-blue/20" 
          : "bg-muted text-muted-foreground"
      )}>
        {icon}
      </div>
      
      <h3 className="font-bold text-center">{name}</h3>
      <p className="text-xs text-muted-foreground text-center mt-1">{description}</p>
      
      <div className="mt-4 w-full">
        <ProgressCircle
          value={progressPercentage}
          size="lg"
          className={achieved ? "text-virtlab-blue" : "text-muted-foreground"}
        >
          <div className="text-xs font-medium">
            {progress}/{maxProgress}
          </div>
        </ProgressCircle>
      </div>
      
      {achieved && (
        <div className="absolute -top-2 -right-2">
          <div className="text-yellow-500 animate-pulse-light">
            <LucideBadge size={20} className="drop-shadow-md" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
