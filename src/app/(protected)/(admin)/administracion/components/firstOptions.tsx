import React from 'react'
import { Dialog } from '@/components/ui/dialog';
import { EditCreateBtn } from '../components/editCreateBtn';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FirstOptions({refreshData, type}: { refreshData: () => void, type:string }) {
    return (
        <div className="flex justify-center mt-8 gap-5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Dialog>
                            <EditCreateBtn type={type}/>
                        </Dialog>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={-100} className='mt-1'>
                        <p>Crear un Nuevo Registro</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Dialog>
                            <Button onClick={refreshData} variant='ghost' className=""> <RefreshCcw className="h-6 w-6"/> </Button>
                        </Dialog>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={-100} className='mt-1'>
                        <p>Actualizar Datos</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}