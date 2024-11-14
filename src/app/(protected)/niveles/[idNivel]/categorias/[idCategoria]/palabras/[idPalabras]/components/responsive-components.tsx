'use client';

import { TitleProp } from '@/interfaces/commonInterfaces'
import { Palabra } from '@/interfaces/palabraInterface'
import React from 'react'
import MobileCarousel from './carrusel/mobile-carousel'
import DesktopCarousel from './carrusel/desktop-carousel';
import { useMediaQuery } from '@mui/material';
import DesktopCamera from './camera/desktop-camera';
import MobileCamera from './camera/mobile-camera';
import DesktopVideo from './vide/desktop-video';
import MobileVideo from './vide/mobile-video';

interface ResponsiveComponentsProps {
    level: TitleProp
    category: TitleProp
    words: Palabra[]
}


export default function ResponsiveComponents({ level, category, words }: ResponsiveComponentsProps) {

    let isMobile = useMediaQuery('(max-width: 1024px)'); 

    return (
        <>
            {( isMobile ? 
            (
                <div className='flex flex-col w-[320px] sm:w-[600px]'>
                    <MobileCamera />
                    <MobileVideo />
                    <MobileCarousel level={level} category={category} words={words}/>
                </div>
            ) 
            : 
            (
                <div className='flex flex-col h-full w-full items-center justify-center gap-10'>
                    <div className='flex flex-grow gap-2 items-center w-full justify-center'>
                        <DesktopVideo />
                        <DesktopCamera/>
                    </div>
                    <DesktopCarousel level={level} category={category} words={words}/>
                </div>
            ) 
            )}
            
        </>
    )
}
