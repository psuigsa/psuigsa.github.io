import { useState } from "react";
import { cn } from "@/lib/utils";

interface InteractiveTextProps {
  text: string;
  className?: string;
  gradient?: string;
}

export default function InteractiveText({ text, className, gradient }: InteractiveTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500 ease-out",
            className,
            isHovered && char !== ' ' && [
              "opacity-80",
              "drop-shadow-lg"
            ]
          )}
          style={{
            transitionDelay: isHovered ? `${index * 30}ms` : `${(text.length - index) * 30}ms`,
            transform: isHovered && char !== ' ' ?
              `translate(${(Math.random() - 0.5) * 120}px, ${(Math.random() - 0.5) * 80 - 30}px)
               rotate(${(Math.random() - 0.5) * 90}deg)
               scale(${0.5 + Math.random() * 0.8})` :
              'translate(0px, 0px) rotate(0deg) scale(1)',
            transformOrigin: 'center center'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      
      {/* Hover instruction */}
      {!isHovered && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-400 opacity-30">
          Hover to explode letters
        </div>
      )}

      {/* Explosion indicator */}
      {isHovered && (
        <div className="absolute -bottom-6 left-0 text-xs text-igsa-saffron opacity-70 animate-pulse">
          💥 Letters exploding!
        </div>
      )}
    </div>
  );
}
