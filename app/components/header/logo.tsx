


    "use client";

import { Wrench } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  showText?: boolean;
}

const Logo = ({ className, iconSize = 18, textSize = "text-xl", showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3 select-none group", className)}>
      <div className="relative flex items-center justify-center">
        {/* Fundo dinâmico da marca */}
        <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
        
        {/* Símbolo Operon (Hexagono estilizado) */}
        <div className="relative w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-blue-400/20">
          <Wrench size={iconSize} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
          
          {/* Detalhe de conectividade (Nexus Dot) */}
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 border-2 border-white rounded-full" />
        </div>
      </div>

      {showText && (
        <div className={cn("flex items-baseline font-black tracking-tighter text-slate-900", textSize)}>
          <span>Op</span>
          <span className="text-blue-600">eron</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
