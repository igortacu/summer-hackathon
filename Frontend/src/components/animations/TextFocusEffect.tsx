
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextFocusEffectProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

const TextFocusEffect: React.FC<TextFocusEffectProps> = ({
  children,
  className,
  threshold = 0.2,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            if (delay) {
              setTimeout(() => {
                containerRef.current?.classList.add('animate-in');
                hasAnimated.current = true;
              }, delay);
            } else {
              containerRef.current?.classList.add('animate-in');
              hasAnimated.current = true;
            }
          }
        });
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'animate-true-focus-container',
        className
      )}
    >
      <span className="animate-item">{children}</span>
    </div>
  );
};

export default TextFocusEffect;
