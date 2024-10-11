'use client'
import { useState } from 'react'
import { ProfileHeader, ToggleButtons, EditProfile, Favorites } from '@/components/customUI/perfil'
import styles from "@/app/styles/home.module.scss"
import {CircleUserRound} from "lucide-react"

export default function Perfil() {
    const [activeView, setActiveView] = useState<'edit' | 'favorites'>('edit')
    const progress = 45 // Este valor vendría de la base de datos en una aplicación real

    return (
        <div className={styles.backgroundImage}>  
            <div className=" p-4 max-w-md mx-auto">
                <div className='flex justify-center mb-4'>
                    <CircleUserRound className="w-24 h-24 mb-2 " />
                </div>
                <ProfileHeader name="Miau Venegas" username="miau1" />
                <div className="relative z-10">
                    <ToggleButtons activeView={activeView} setActiveView={setActiveView} />
                </div>
                <div className={`rounded-3xl p-6 shadow-md flex-grow ${activeView === 'favorites' ? 'bg-primary-100' : 'bg-secondary-100'}`}>
                    {activeView === 'edit' 
                    ? <EditProfile progress={progress} /> 
                    : <Favorites />
                    }
                </div>
            </div>
        </div>  
    )
}