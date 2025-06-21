
import React, { useRef, useEffect } from 'react';

interface PhysicsSimulationProps {
  settings: {
    gravity: number;
    velocity: number;
    mass: number;
    angle: number;
    airResistance: number;
    time: number;
  };
  results: any | null;
}

const PhysicsSimulation: React.FC<PhysicsSimulationProps> = ({ settings, results }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !results) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const parentRect = canvas.parentElement?.getBoundingClientRect();
    if (parentRect) {
      canvas.width = parentRect.width;
      canvas.height = parentRect.height;
    }
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the ground
    const groundLevel = canvas.height - 20;
    ctx.beginPath();
    ctx.moveTo(0, groundLevel);
    ctx.lineTo(canvas.width, groundLevel);
    ctx.strokeStyle = '#888';
    ctx.stroke();
    
    // Find max values to scale the visualization
    const maxHeight = results.maxHeight;
    const maxDistance = results.maxDistance;
    
    // Scale factors
    const scaleX = (canvas.width - 60) / maxDistance;
    const scaleY = (groundLevel - 40) / maxHeight;
    
    // Draw axes labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    
    // X-axis labels
    for (let i = 0; i <= maxDistance; i += maxDistance / 5) {
      const x = 30 + i * scaleX;
      ctx.fillText(`${Math.round(i)}m`, x, groundLevel + 15);
    }
    
    // Y-axis labels
    for (let i = 0; i <= maxHeight; i += maxHeight / 5) {
      const y = groundLevel - i * scaleY;
      ctx.fillText(`${Math.round(i)}m`, 5, y);
    }
    
    // Draw trajectory
    ctx.beginPath();
    ctx.strokeStyle = '#4F9DDE';
    ctx.lineWidth = 2;
    
    const trajectory = results.trajectory;
    let prevX = 30; // Offset for y-axis
    let prevY = groundLevel;
    
    trajectory.forEach((point: any, index: number) => {
      const x = 30 + point.distance * scaleX;
      const y = groundLevel - point.height * scaleY;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      prevX = x;
      prevY = y;
    });
    
    ctx.stroke();
    
    // Draw projectile at the end of the trajectory
    const lastPoint = trajectory[trajectory.length - 1];
    if (lastPoint) {
      const x = 30 + lastPoint.distance * scaleX;
      const y = groundLevel - lastPoint.height * scaleY;
      
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#4F9DDE';
      ctx.fill();
    }
    
    // Draw starting point
    ctx.beginPath();
    ctx.arc(30, groundLevel, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#4F9DDE';
    ctx.fill();
    
    // Draw initial velocity vector
    const angleRad = settings.angle * Math.PI / 180;
    const vectorLength = settings.velocity * 2;
    
    ctx.beginPath();
    ctx.moveTo(30, groundLevel);
    ctx.lineTo(
      30 + Math.cos(angleRad) * vectorLength,
      groundLevel - Math.sin(angleRad) * vectorLength
    );
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add arrow to the vector
    const arrowSize = 6;
    ctx.beginPath();
    ctx.moveTo(
      30 + Math.cos(angleRad) * vectorLength,
      groundLevel - Math.sin(angleRad) * vectorLength
    );
    ctx.lineTo(
      30 + Math.cos(angleRad) * vectorLength - arrowSize * Math.cos(angleRad - Math.PI / 6),
      groundLevel - Math.sin(angleRad) * vectorLength + arrowSize * Math.sin(angleRad - Math.PI / 6)
    );
    ctx.lineTo(
      30 + Math.cos(angleRad) * vectorLength - arrowSize * Math.cos(angleRad + Math.PI / 6),
      groundLevel - Math.sin(angleRad) * vectorLength + arrowSize * Math.sin(angleRad + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = '#F97316';
    ctx.fill();
    
    // Add gravity vector
    ctx.beginPath();
    ctx.moveTo(60, 30);
    ctx.lineTo(60, 30 + settings.gravity * 2);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add arrow to gravity vector
    ctx.beginPath();
    ctx.moveTo(60, 30 + settings.gravity * 2);
    ctx.lineTo(60 - arrowSize / 2, 30 + settings.gravity * 2 - arrowSize);
    ctx.lineTo(60 + arrowSize / 2, 30 + settings.gravity * 2 - arrowSize);
    ctx.closePath();
    ctx.fillStyle = '#EF4444';
    ctx.fill();
    
    // Add labels
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText('g', 65, 30 + settings.gravity);
    ctx.fillText('v₀', 30 + Math.cos(angleRad) * vectorLength / 2, 
                groundLevel - Math.sin(angleRad) * vectorLength / 2 - 5);
  }, [settings, results]);
  
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="animate-pulse text-virtlab-blue mb-6">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h3 className="font-medium text-lg mb-2">Ready to Run Simulation</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">Click the "Run Simulation" button below to visualize your projectile's trajectory</p>
      </div>
    );
  }
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default PhysicsSimulation;
