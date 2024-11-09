import { LevelIcon } from "./level-icon"
import { Nivel } from "@/interfaces/levelinterface"

interface CardContentProps {
    levelData: Nivel
    isHovered: boolean
    isLocked: boolean
}

export function CardContent({ levelData, isHovered, isLocked }: CardContentProps) {
    return (
        <>
            <div 
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
                isHovered ? 'opacity-0' : 'opacity-100'
                }`}>
                <div className="flex-grow flex items-center justify-center">
                    <LevelIcon 
                        iconName={isLocked ? 'Lock' : levelData.iconoNivel}
                        isLocked={isLocked}
                    />
                </div>
                <div className="text-center mt-4 ">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-black">{levelData.nombreNivel}</h3>
                </div>
            </div>
            <div 
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-in-out ${
                isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-normal mb-4 text-black">{levelData.nombreNivel}</h3>
                <div className="sm:text-lg md:text-xl lg:text-2xl text-center whitespace-pre-line text-black">
                    {isLocked ? `${levelData.descripcionNivel}\nCompleta el nivel anterior para desbloquear` : levelData.descripcionNivel || 'No hay descripción disponible'}
                </div>
            </div>
        </>
    )
}