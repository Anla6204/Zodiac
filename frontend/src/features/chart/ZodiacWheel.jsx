import React from 'react';

export default function ZodiacWheel() {
  return (
    <div className="cosmic-wheel">
      <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <circle cx="400" cy="400" r="380" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
        <circle cx="400" cy="400" r="350" fill="none" stroke="rgba(253, 224, 71, 0.1)" strokeWidth="2" strokeDasharray="5, 15" />
        <circle cx="400" cy="400" r="300" fill="none" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" />
        
        {/* Draw 12 dividing lines for Zodiac houses */}
        {[...Array(12)].map((_, i) => (
          <line 
            key={i}
            x1="400" y1="50" x2="400" y2="100" 
            stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" 
            transform={`rotate(${i * 30} 400 400)`} 
          />
        ))}

        {/* Draw smaller markings */}
        {[...Array(36)].map((_, i) => (
          i % 3 !== 0 && (
            <line 
              key={`sub-${i}`}
              x1="400" y1="50" x2="400" y2="65" 
              stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" 
              transform={`rotate(${i * 10} 400 400)`} 
            />
          )
        ))}
      </svg>
    </div>
  );
}
