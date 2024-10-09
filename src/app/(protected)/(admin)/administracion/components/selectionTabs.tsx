'use client'

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function SelectionTabs() {
    const [title, setTitle] = useState('Usuarios');
    function handleOnClick(title:string){
        setTitle(title);
    }

    return (
        <>
            <h1 className='my-16 text-4xl'>Administración de: <span className='text-primary-800 font-medium bg-primary-50 p-2 rounded-xl'>{title}</span></h1>
            <TabsList className='h-16 w-[22rem] gap-5 rounded-3xl'>
                <TabsTrigger
                    onClick={() => handleOnClick('Usuarios')}
                    value="users"
                    className='data-[state=active]:text-xl rounded-xl text-primary-800'
                >
                    Usuarios
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => handleOnClick('Categorias')}
                    value="categories"
                    className='data-[state=active]:text-xl rounded-xl text-primary-800'
                >
                    Categorias
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => handleOnClick('Palabras')}
                    value="words"
                    className='data-[state=active]:text-xl rounded-xl text-primary-800'
                >
                    Palabras
                </TabsTrigger>
            </TabsList>
        </>
    )
};