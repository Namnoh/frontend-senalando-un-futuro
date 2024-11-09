'use client'

import { Nivel, UserProgress } from '@/interfaces/levelinterface'
import { DynamicIcon } from '@/components/customUI/dynamicLucideIcon'
import { Progress } from '@/components/ui/progress'

interface ProgresoProps {
    niveles: Nivel[];
    userProgress: UserProgress;
}

export default function Progreso({ niveles, userProgress }: ProgresoProps) {
    return (
        <div className="flex flex-col space-y-4 text-black">
            <h3 className="lg:text-2xl sm:text-xl font-semibold">Progreso Niveles</h3>
            <div className="space-y-6">
                {niveles.map((nivel) => {
                    const isLocked = nivel.bloqueado;
                    const full = nivel.id < userProgress.idNivel ? 100 : null; 
                    const progressValue = isLocked ? 0 : (full ?? userProgress.porcentajeNivel);
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
                                    className={`w-full ${isLocked ?  'h-3 w-[70%] bg-gray-400' : 'border-2 border-primary-200 h-4 w-[70%] bg-primary-50'}`}
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