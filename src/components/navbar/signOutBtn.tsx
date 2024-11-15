import React from 'react';
import { DynamicIcon } from '../customUI/dynamicLucideIcon';
import { Vista } from '@/interfaces/vistaInterface';
import { signOut } from 'next-auth/react';

export default function SignOutBtn({l, isOpen}:{l:Vista, isOpen?:boolean}) {
    return (
        <div
            onClick={() => signOut()}
            className={`group mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-primary-800 hover:bg-primary-50 ${isOpen ? 'text-base' : ''}`}
        >
            <DynamicIcon name={l.iconoVista} classes={`h-5 w-5`}/>
            {isOpen ? (l.tituloVista) :
                (
                    <span
                        className="absolute rounded-md px-2 py-1 ml-6 text-nowrap
                        bg-primary-100 text-text-foreground text-sm
                        invisible opacity-20 -translate-x-3 transition-all w-50
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-10
                        "
                    >
                        {l.tituloVista}
                    </span>
                )}
        </div>
    )
}
