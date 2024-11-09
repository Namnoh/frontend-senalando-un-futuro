'use client'

import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SelectionTabs({activeTab}:{activeTab:string}) {
    const tabTitles = {
        users: 'Usuarios',
        categories: 'Categorias',
        words: 'Palabras'
    };

    return (
        <>
            <h1 className='my-14 text-4xl'>Administración de: <span className='text-secondary-800 font-medium bg-muted p-3 rounded-3xl'>{tabTitles[activeTab as keyof typeof tabTitles]}</span></h1>
            <TabsList className='h-14 w-[20rem] gap-4 rounded-2xl'>
                {Object.entries(tabTitles).map(([value, label]) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className='data-[state=active]:text-lg rounded-xl text-primary-800 transition-all ease-in-out duration-150'
                    >
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </>
    )
};