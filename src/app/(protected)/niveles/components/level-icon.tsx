import { DynamicIcon } from "@/components/customUI/dynamicLucideIcon"

interface LevelIconProps {
    iconName: string
    isLocked: boolean
}

export function LevelIcon({ iconName, isLocked }: LevelIconProps) {
    return (
        <DynamicIcon 
        strokeWidth={1.25}
        name={iconName}
        classes={`pt-6 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 ${isLocked ? 'text-gray-400' : 'text-black'}`}
        />
    )
}