'use client'

import { Dialog } from '@/components/ui/dialog';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { EditCreateBtn } from './editCreateBtn';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function SelectionTabs() {
    const [title, setTitle] = useState('Usuarios');
    function handleOnClick(title:string){
        setTitle(title);
    }

    return (
        <>
            <h1 className='my-14 text-4xl'>Administración de: <span className='text-secondary-800 font-medium bg-muted p-3 rounded-3xl'>{title}</span></h1>
            <TabsList className='h-14 w-[20rem] gap-4 rounded-2xl'>
                <TabsTrigger
                    onClick={() => handleOnClick('Usuarios')}
                    value="users"
                    className='data-[state=active]:text-lg rounded-xl text-primary-800 transition-all ease-in-out duration-200'
                >
                    Usuarios
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => handleOnClick('Categorias')}
                    value="categories"
                    className='data-[state=active]:text-lg rounded-xl text-primary-800 transition-all ease-in-out duration-200'
                >
                    Categorias
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => handleOnClick('Palabras')}
                    value="words"
                    className='data-[state=active]:text-lg rounded-xl text-primary-800 transition-all ease-in-out duration-200'
                >
                    Palabras
                </TabsTrigger>
            </TabsList>
            <div className='mt-8'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Dialog>
                                <EditCreateBtn create={true}/>
                            </Dialog>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={-100} className='mt-1'>
                            <p>Crear un Nuevo Registro</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </>
    )
};