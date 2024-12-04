"use client";
import React from "react";
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
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center justify-center rounded-full w-5 h-5 bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-help">
            <HelpCircle className="w-4 h-4" />
            <span className="sr-only">Más información</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {message.replace(/\\n/g, '\n')}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
