
import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';

interface CompletionBadgeProps {
  title: string;
  description: string;
  onClose: () => void;
}

const CompletionBadge: React.FC<CompletionBadgeProps> = ({ title, description, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animate in after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    // Give time for animation to complete before calling onClose
    setTimeout(onClose, 500);
  };
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl transform transition-all duration-500 max-w-sm w-full ${isVisible ? 'scale-100' : 'scale-90'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button 
            className="absolute top-2 right-2 rounded-full p-1 hover:bg-gray-100 transition-colors"
            onClick={handleClose}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="relative mb-5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-virtlab-blue to-blue-500 flex items-center justify-center shadow-lg shadow-virtlab-blue/20">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-full bg-transparent border-4 border-b-transparent border-virtlab-blue/20 animate-spin-slow"></div>
              </div>
              
              <h2 className="text-xl font-bold mb-1">{title}</h2>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
            
            <div className="bg-virtlab-blue/10 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">XP Earned</div>
                <div className="font-bold text-virtlab-blue">+25 XP</div>
              </div>
            </div>
            
            <button 
              className="w-full py-2.5 bg-virtlab-blue text-white rounded-md font-medium hover:bg-virtlab-blue/90 transition-colors"
              onClick={handleClose}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionBadge;
