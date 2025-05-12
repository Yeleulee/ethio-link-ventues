import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  width = 60, 
  height = 60 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 800 800" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Red Circle */}
      <circle cx="400" cy="120" r="90" fill="#E84C3D" />
      
      {/* Orange Circle */}
      <circle cx="240" cy="200" r="80" fill="#F39C12" />
      
      {/* Yellow Circle */}
      <circle cx="120" cy="330" r="80" fill="#F1C40F" />
      
      {/* Green Circle */}
      <circle cx="560" cy="200" r="80" fill="#8BC34A" />
      
      {/* Blue Circle */}
      <circle cx="680" cy="330" r="80" fill="#3498DB" />
      
      {/* Colored Lines */}
      <rect x="392" y="120" width="16" height="250" rx="8" fill="#E84C3D" transform="rotate(0 392 120)" />
      <rect x="240" y="200" width="16" height="180" rx="8" fill="#F39C12" transform="rotate(-45 240 200)" />
      <rect x="120" y="330" width="16" height="120" rx="8" fill="#F1C40F" transform="rotate(-60 120 330)" />
      <rect x="560" y="200" width="16" height="180" rx="8" fill="#8BC34A" transform="rotate(45 560 200)" />
      <rect x="680" y="330" width="16" height="120" rx="8" fill="#3498DB" transform="rotate(60 680 330)" />
      
      {/* Handshake */}
      <path 
        d="M595,485 C595,485 525,455 500,455 C475,455 460,465 440,465 C410,465 390,440 355,440 C320,440 280,465 280,465 L150,560 C150,560 120,580 120,620 C120,660 150,680 150,680 L190,700 L190,560 L265,510 C265,510 305,490 335,490 C365,490 380,510 410,510 C440,510 455,495 475,495 C495,495 520,510 520,510 L605,560 L605,700 L645,680 C645,680 675,660 675,620 C675,580 645,560 645,560 L595,485 Z" 
        fill="#1A5276" 
      />
      <path 
        d="M240,680 C240,680 265,645 325,645 C385,645 410,680 410,680 L410,550 C410,550 380,525 325,525 C270,525 240,550 240,550 L240,680 Z" 
        fill="#2980B9" 
      />
      <path 
        d="M550,680 C550,680 525,645 465,645 C405,645 380,680 380,680 L380,550 C380,550 410,525 465,525 C520,525 550,550 550,550 L550,680 Z" 
        fill="#2980B9" 
      />
    </svg>
  );
}; 