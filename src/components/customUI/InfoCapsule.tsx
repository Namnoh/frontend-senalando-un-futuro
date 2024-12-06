import React, { useState, useRef, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface InfoCapsuleProps {
  message: string;
}

export const InfoCapsule: React.FC<InfoCapsuleProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const toggleTooltip = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  // Detectar clics fuera del componente y cerrar el tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Cierra el tooltip si el clic está fuera del componente
      }
    };

    // Agregar el evento al hacer clic
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} open={isOpen}>
        <TooltipTrigger asChild>
          <div
            onClick={toggleTooltip}
            className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-white text-black cursor-help"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="sr-only">Más información</span>
          </div>
        </TooltipTrigger>
        <TooltipContent ref={tooltipRef}>
          <p className="w-[320px] md:h-auto md:w-auto text-[0.75rem] sm:text-base" style={{ whiteSpace: 'pre-line' }}>
            {message}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
