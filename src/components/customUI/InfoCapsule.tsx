"use client";

import React, { useState } from "react";
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

  const toggleTooltip = () => {
    setIsOpen((prev: boolean) => !prev);
  };
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} open={isOpen}>
        <TooltipTrigger asChild>
          <div onClick={toggleTooltip} className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-white text-black cursor-help">
            <HelpCircle className="w-4 h-4" />
            <span className="sr-only">Más información</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="w-[320px] md:h-auto md:w-auto text-[0.75rem] sm:text-base" style={{ whiteSpace: 'pre-wrap' }}>
            {message.replace(/\\n/g, '\n')}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};