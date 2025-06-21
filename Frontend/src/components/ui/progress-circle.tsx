
import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  strokeWidth?: number;
  children?: React.ReactNode;
}

export const ProgressCircle = ({
  value,
  size = "md",
  className,
  strokeWidth = 3,
  children,
}: ProgressCircleProps) => {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
  };
  
  const actualSize = sizeMap[size];
  const centerPoint = actualSize / 2;
  const radius = centerPoint - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={actualSize}
        height={actualSize}
        viewBox={`0 0 ${actualSize} ${actualSize}`}
        className="transform -rotate-90"
      >
        <circle
          cx={centerPoint}
          cy={centerPoint}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
        />
        <circle
          cx={centerPoint}
          cy={centerPoint}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
