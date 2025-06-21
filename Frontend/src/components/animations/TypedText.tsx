
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypedTextProps {
  text: string[];
  className?: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursorClassName?: string;
  textGradient?: boolean;
  animationStyle?: 'default' | 'blur' | 'shiny' | 'split' | 'float';
}

const TypedText: React.FC<TypedTextProps> = ({
  text,
  className,
  speed = 50,
  delay = 800,
  loop = true,
  cursorClassName,
  textGradient = false,
  animationStyle = 'default',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cursor blinking effect
  useEffect(() => {
    const blinkCursor = () => {
      cursorTimeoutRef.current = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500);
    };
    
    blinkCursor();
    
    return () => {
      if (cursorTimeoutRef.current) {
        clearInterval(cursorTimeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const type = () => {
      const currentLineText = text[currentLine];
      
      if (isTyping && !isDeleting) {
        if (currentIndex < currentLineText.length) {
          // Still typing the current word
          setDisplayText(prev => prev + currentLineText[currentIndex]);
          setCurrentIndex(currentIndex + 1);
          timeoutRef.current = setTimeout(type, speed);
        } else {
          // Finished typing the current line
          timeoutRef.current = setTimeout(() => {
            if (loop) {
              setIsDeleting(true);
              timeoutRef.current = setTimeout(type, delay);
            }
          }, delay * 2);
        }
      } else if (isDeleting) {
        if (currentIndex > 0) {
          // Deleting the current word
          setDisplayText(currentLineText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
          timeoutRef.current = setTimeout(type, speed / 2);
        } else {
          // Finished deleting, move to the next line
          setIsDeleting(false);
          const nextLine = (currentLine + 1) % text.length;
          setCurrentLine(nextLine);
          timeoutRef.current = setTimeout(type, speed);
        }
      }
    };
    
    timeoutRef.current = setTimeout(type, speed);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, currentIndex, currentLine, isTyping, isDeleting, loop]);

  // Animation styles
  const getAnimationClass = () => {
    switch (animationStyle) {
      case 'blur':
        return 'animate-blur-text';
      case 'shiny':
        return 'animate-shiny-text';
      case 'split':
        return 'animate-split-text';
      case 'float':
        return 'animate-float-text';
      default:
        return '';
    }
  };
  
  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <span className={cn(
        'transition-colors',
        textGradient && 'bg-gradient-to-r from-virtlab-blue to-blue-500 bg-clip-text text-transparent',
        getAnimationClass()
      )}>
        {displayText}
      </span>
      <span 
        className={cn(
          'inline-block ml-0.5 bg-primary w-1 h-6 align-middle',
          cursorVisible ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-200',
          cursorClassName
        )}
      >
        &nbsp;
      </span>
    </div>
  );
};

export default TypedText;
