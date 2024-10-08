// 'use client';
// 'use server';
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const DynamicIcon = ({name, classes}: {name:string, classes:string}) => {
    const IconComponent = (LucideIcons[name as keyof typeof LucideIcons] as LucideIcon) || null
    if (!IconComponent) {
        console.warn(`Icon ${name} not found`)
        return null
    }

    return <IconComponent className={classes} />;
}