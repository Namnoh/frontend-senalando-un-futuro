'use client'

import { Nivel, PalabraProgreso, UserProgress } from '@/interfaces/levelinterface'
import { DynamicIcon } from '@/components/customUI/dynamicLucideIcon'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react';

interface ProgresoProps {
    niveles: Nivel[];
    userProgress: UserProgress;
}

export default function Progreso({ niveles, userProgress }: ProgresoProps) {
    const [levelProgress, setLevelProgress] = useState<number[]>([0,0,0])
    
    const calculateProgress = async () => {
        try {
            const percentages = await Promise.all(
                niveles.map(async (nivel) => {
                    const levelWordsResponse = await fetch(`/api/words/getAllWordsFromLevel/${nivel.id}`, {
                        method: "GET",
                        cache: 'no-cache'
                    });
                    if (!levelWordsResponse.ok) {
                        throw new Error(`Failed to fetch words for level ${nivel.id}`);
                    }
    
                    const levelWords = await levelWordsResponse.json();
    
                    const userWords = Object.values(userProgress.palabrasProgreso)
                        .filter((palabraProgreso: PalabraProgreso) => palabraProgreso.nivelPalabra === nivel.id).length;
    
                    const porcentajeTotal = Math.round(100 * (userWords / levelWords.length));
                    return porcentajeTotal;
                })
            );
            console.log(percentages)
            setLevelProgress(percentages);
        } catch (error) {
            console.error("Error al actualizar el progreso:", error);
        }
    };

    useEffect(() => {
        calculateProgress();
    }, []);
    
    return (
        <div className="flex flex-col space-y-4 text-black">
            <h3 className="lg:text-2xl sm:text-xl font-semibold">Progreso Niveles</h3>
            <div className="space-y-6">
                {niveles.map((nivel) => {
                    const isLocked = nivel.bloqueado;
                    const progressValue = levelProgress[nivel.id-1];
                    return (
                        <div key={nivel.id} className="space-y-2">
                            {/* Icono y nombre del nivel */}
                            <div className="flex items-center space-x-4">
                                <DynamicIcon name={nivel.iconoNivel} classes="w-10 h-10" />
                                <p className="text-lg font-medium">{nivel.nombreNivel}</p>
                            </div>

                            {/* Barra de progreso y porcentaje */}
                            <div className="flex items-center space-x-3 sm:space-x-24 ">
                                <Progress
                                    value={progressValue}
                                    className={`w-full ${isLocked ? 'h-3 w-[70%] bg-gray-400' : 'border-2 border-primary-200 h-4 w-[70%] bg-primary-50'}`}
                                />
                                <span className="text-lg  ">
                                    {isLocked ? ' Bloqueado' : `${progressValue}%`}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}