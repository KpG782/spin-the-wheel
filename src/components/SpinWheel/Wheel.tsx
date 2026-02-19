import React, { useRef, useEffect } from 'react';
import { Prize } from '../../types/game.types';
import './Wheel.css';

interface WheelProps {
  sections: Prize[];
  rotation: number;
  isSpinning: boolean;
}

export const Wheel: React.FC<WheelProps> = ({ sections, rotation, isSpinning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on container size
    const size = Math.min(container.clientWidth, container.clientHeight);
    canvas.width = size;
    canvas.height = size;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Start drawing from top (12 o'clock) instead of right (3 o'clock)
    // Subtract 90 degrees (π/2 radians) to align with pointer
    let startAngle = -Math.PI / 2;

    // Draw wheel sections
    sections.forEach((section) => {
      const angleInRadians = (section.angle * Math.PI) / 180;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + angleInRadians);
      ctx.closePath();
      ctx.fillStyle = section.color;
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + angleInRadians / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw icon
      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = '#1A1A1A';
      ctx.fillText(section.icon || '', radius * 0.7, -10);
      
      // Draw text
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#1A1A1A';
      
      // Split text into multiple lines if needed
      const words = section.name.split(' ');
      const maxWidth = radius * 0.5;
      let lines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      lines.push(currentLine);
      
      // Draw lines
      lines.forEach((line, i) => {
        ctx.fillText(line, radius * 0.7, 15 + (i * 16));
      });
      
      ctx.restore();

      startAngle += angleInRadians;
    });

    // Draw center circle (scaled based on canvas size)
    const centerCircleRadius = radius * 0.1; // 10% of wheel radius
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#0A0E1A';
    ctx.fill();
    ctx.strokeStyle = '#0066FF';
    ctx.lineWidth = 4;
    ctx.stroke();

  }, [sections]);

  return (
    <div className="wheel-wrapper">
      <div className="wheel-pointer">▼</div>
      <div 
        ref={containerRef}
        className={`wheel-container ${isSpinning ? 'spinning' : ''}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
        }}
      >
        <canvas 
          ref={canvasRef}
          className="wheel-canvas no-select"
        />
      </div>
    </div>
  );
};
