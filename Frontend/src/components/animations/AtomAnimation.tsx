
import React, { useEffect, useRef, useState } from 'react';

const AtomAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const width = Math.min(500, window.innerWidth * 0.8);
      const height = width;
      canvas.width = width;
      canvas.height = height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    let animationId: number;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const nucleusRadius = canvas.width / 12;
    const electronRadius = canvas.width / 40;
    
    // Electron orbits data
    const orbits = [
      { radius: canvas.width / 4, speed: 0.005, phase: 0, color: '#4F9DDE' },
      { radius: canvas.width / 3, speed: 0.003, phase: 2, color: '#E5DEFF' },
      { radius: canvas.width / 2.5, speed: 0.002, phase: 4, color: '#FEF7CD' }
    ];
    
    // Mouse interaction
    let mousePos = { x: 0, y: 0 };
    let isMouseOver = false;
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      isMouseOver = true;
    });
    
    canvas.addEventListener('mouseleave', () => {
      isMouseOver = false;
    });
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nucleus with gradient
      const nucleusGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, nucleusRadius
      );
      nucleusGradient.addColorStop(0, '#FEF7CD');
      nucleusGradient.addColorStop(1, '#F97316');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
      ctx.fillStyle = nucleusGradient;
      ctx.fill();
      
      // Apply subtle tilt based on mouse position if mouse is over
      let tiltX = 0;
      let tiltY = 0;
      
      if (isMouseOver) {
        tiltX = (mousePos.x - centerX) / (canvas.width / 2) * 0.2;
        tiltY = (mousePos.y - centerY) / (canvas.height / 2) * 0.2;
      }
      
      // Draw orbits and electrons
      orbits.forEach((orbit, index) => {
        // Update orbit phase
        orbit.phase += orbit.speed;
        
        // Draw orbit path (ellipse due to tilt)
        ctx.beginPath();
        ctx.ellipse(
          centerX, 
          centerY, 
          orbit.radius, 
          orbit.radius * (1 - Math.abs(tiltY) * 0.3), 
          tiltX, 
          0, 
          Math.PI * 2
        );
        ctx.strokeStyle = `${orbit.color}40`; // 40 is hex for 25% opacity
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Calculate electron position with tilt effect
        const electronX = centerX + Math.cos(orbit.phase) * orbit.radius * (1 - Math.abs(tiltY) * 0.1);
        const electronY = centerY + Math.sin(orbit.phase) * orbit.radius * (1 - Math.abs(tiltX) * 0.1);
        
        // Draw electron glow
        const glowGradient = ctx.createRadialGradient(
          electronX, electronY, 0,
          electronX, electronY, electronRadius * 2
        );
        glowGradient.addColorStop(0, `${orbit.color}FF`); // Full opacity
        glowGradient.addColorStop(1, `${orbit.color}00`); // Transparent
        
        ctx.beginPath();
        ctx.arc(electronX, electronY, electronRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Draw electron
        ctx.beginPath();
        ctx.arc(electronX, electronY, electronRadius, 0, Math.PI * 2);
        ctx.fillStyle = orbit.color;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation after a short delay to allow for fade-in effect
    setTimeout(() => {
      setIsVisible(true);
      animate();
    }, 300);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className={`w-full max-w-xl mx-auto transition-opacity duration-1000 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default AtomAnimation;
