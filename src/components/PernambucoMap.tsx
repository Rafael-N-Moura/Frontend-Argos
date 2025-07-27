import { useState } from 'react';

interface PernambucoMapProps {
  selectedRegion: string | null;
  onRegionClick: (regionId: string) => void;
}

const PernambucoMap = ({ selectedRegion, onRegionClick }: PernambucoMapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getRegionFill = (regionId: string) => {
    if (selectedRegion === regionId) {
      return 'hsl(var(--political-blue))';
    }
    if (hoveredRegion === regionId) {
      return 'hsl(var(--political-blue) / 0.7)';
    }
    return 'hsl(var(--muted))';
  };

  const getRegionStroke = (regionId: string) => {
    if (selectedRegion === regionId || hoveredRegion === regionId) {
      return 'hsl(var(--political-blue))';
    }
    return 'hsl(var(--border))';
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="w-full h-full max-w-md"
      >
        {/* Sertão */}
        <path
          id="sertao"
          d="M50 50 L350 50 L300 150 L100 150 Z"
          fill={getRegionFill('sertao')}
          stroke={getRegionStroke('sertao')}
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onMouseEnter={() => setHoveredRegion('sertao')}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={() => onRegionClick('sertao')}
        />
        
        {/* Agreste */}
        <path
          id="agreste"
          d="M100 150 L300 150 L280 250 L120 250 Z"
          fill={getRegionFill('agreste')}
          stroke={getRegionStroke('agreste')}
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onMouseEnter={() => setHoveredRegion('agreste')}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={() => onRegionClick('agreste')}
        />
        
        {/* Mata */}
        <path
          id="mata"
          d="M120 250 L280 250 L270 320 L130 320 Z"
          fill={getRegionFill('mata')}
          stroke={getRegionStroke('mata')}
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onMouseEnter={() => setHoveredRegion('mata')}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={() => onRegionClick('mata')}
        />
        
        {/* Metropolitana */}
        <path
          id="metropolitana"
          d="M130 320 L270 320 L260 350 L140 350 Z"
          fill={getRegionFill('metropolitana')}
          stroke={getRegionStroke('metropolitana')}
          strokeWidth="2"
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onMouseEnter={() => setHoveredRegion('metropolitana')}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={() => onRegionClick('metropolitana')}
        />
        
        {/* Region Labels */}
        <text x="200" y="100" textAnchor="middle" className="fill-current text-sm font-medium pointer-events-none">
          Sertão
        </text>
        <text x="200" y="200" textAnchor="middle" className="fill-current text-sm font-medium pointer-events-none">
          Agreste
        </text>
        <text x="200" y="285" textAnchor="middle" className="fill-current text-sm font-medium pointer-events-none">
          Mata
        </text>
        <text x="200" y="340" textAnchor="middle" className="fill-current text-sm font-medium pointer-events-none">
          Metropolitana
        </text>
      </svg>
    </div>
  );
};

export default PernambucoMap;