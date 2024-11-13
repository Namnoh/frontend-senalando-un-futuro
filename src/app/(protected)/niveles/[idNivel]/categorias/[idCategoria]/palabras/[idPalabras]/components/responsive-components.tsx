'use client';

import { TitleProp } from '@/interfaces/commonInterfaces'
import { Palabra } from '@/interfaces/palabraInterface'
import React from 'react'
import MobileCarousel from './carrusel/mobile-carousel'
import DesktopCarousel from './carrusel/desktop-carousel';
import { useMediaQuery } from '@mui/material';

interface ResponsiveComponentsProps {
    level: TitleProp
    category: TitleProp
    words: Palabra[]
}


export default function ResponsiveComponents({ level, category, words }: ResponsiveComponentsProps) {

    let isMobile = useMediaQuery('(max-width: 767px)'); 

    return (
        <>
            {( isMobile ? 
            (
                <MobileCarousel level={level} category={category} words={words}/>
            ) 
            : 
            (
                <DesktopCarousel level={level} category={category} words={words}/> 
            ) 
            )}
            
        </>
    )
}
