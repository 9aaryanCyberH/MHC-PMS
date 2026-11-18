import React from 'react';

/**
 * Aarogyam Brand Logo
 * Elegant fusion of Lotus Wellness Petal + Clinical Medical Cross + Golden Vitality Sun
 * Palette: Gemini Nano Banana (Warm Golden Amber #F59E0B / #FBBF24) & Clinical Emerald/Teal
 */
export const AarogyamLogo = ({ 
  size = "md", 
  showText = true, 
  variant = "light", // 'light' (on white/light bg) or 'dark' (on dark bg)
  subtitle = "Hospitals"
}) => {
  const sizeMap = {
    xs: { icon: 24, text: "text-base", sub: "text-[9px]" },
    sm: { icon: 32, text: "text-lg", sub: "text-[10px]" },
    md: { icon: 42, text: "text-xl", sub: "text-[11px]" },
    lg: { icon: 52, text: "text-2xl", sub: "text-xs" },
    xl: { icon: 64, text: "text-3xl", sub: "text-sm" }
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Brand Emblem SVG */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-2xl shadow-md transition-transform hover:scale-105"
        style={{
          width: currentSize.icon,
          height: currentSize.icon,
          background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FACC15 100%)',
          boxShadow: '0 8px 20px -4px rgba(245, 158, 11, 0.35)'
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          {/* Subtle Outer Protective Halo / Petal */}
          <path 
            d="M50 10C62 26 84 34 84 56C84 76 68 90 50 90C32 90 16 76 16 56C16 34 38 26 50 10Z" 
            fill="#FFFFFF" 
            fillOpacity="0.22"
          />

          {/* Central Medical Cross & Wellness Heart Node */}
          <rect 
            x="44" 
            y="26" 
            width="12" 
            height="48" 
            rx="6" 
            fill="#0F172A"
          />
          <rect 
            x="26" 
            y="44" 
            width="48" 
            height="12" 
            rx="6" 
            fill="#0F172A"
          />

          {/* Central Radiant Vitality Jewel */}
          <circle 
            cx="50" 
            cy="50" 
            r="8" 
            fill="#FEF08A"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="4" 
            fill="#F59E0B"
          />

          {/* Upward Life Spark Pulse */}
          <path 
            d="M50 18L52 23L57 25L52 27L50 32L48 27L43 25L48 23L50 18Z" 
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'} ${currentSize.text}`} style={{ fontFamily: "'Google Sans', 'Product Sans', 'Roboto', sans-serif" }}>
              Aarogyam
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
              {subtitle}
            </span>
          </div>
          <span className={`font-medium ${isDark ? 'text-amber-300/80' : 'text-slate-500'} ${currentSize.sub}`}>
            Specialist Mental Healthcare
          </span>
        </div>
      )}
    </div>
  );
};

