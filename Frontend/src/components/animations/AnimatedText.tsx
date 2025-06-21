
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: 'focus' | 'float' | 'shiny' | 'blur' | 'split' | 'velocity';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
  threshold?: number;
  splitWords?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  animationType = 'focus',
  tag: Tag = 'div',
  delay = 0,
  threshold = 0.2,
  splitWords = false,
}) => {
  const textRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Skip for SSR
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            if (delay) {
              setTimeout(() => {
                textRef.current?.classList.add('animate-in');
                hasAnimated.current = true;
              }, delay);
            } else {
              textRef.current?.classList.add('animate-in');
              hasAnimated.current = true;
            }
          }
        });
      },
      { threshold }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getAnimationClass = () => {
    switch (animationType) {
      case 'focus':
        return 'animate-true-focus-container';
      case 'float':
        return 'animate-scroll-float-container';
      case 'shiny':
        return 'animate-shiny-text-container';
      case 'blur':
        return 'animate-blur-text-container';
      case 'split':
        return 'animate-split-text-container';
      case 'velocity':
        return 'animate-scroll-velocity-container';
      default:
        return '';
    }
  };

  const renderText = () => {
    if (splitWords) {
      return text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mx-1">
          <span className="inline-block transform transition-transform duration-700 translate-y-full opacity-0 animate-item">
            {word}
          </span>
        </span>
      ));
    }

    if (animationType === 'split') {
      return text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span 
            className="inline-block transform transition-all duration-500 opacity-0 animate-item"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ));
    }

    return <span className="animate-item">{text}</span>;
  };

  return (
    <Tag 
      ref={textRef as React.RefObject<any>} 
      className={cn(
        'overflow-hidden',
        getAnimationClass(),
        animationType === 'shiny' && 'relative',
        className
      )}
    >
      {renderText()}
    </Tag>
  );
};

export default AnimatedText;
