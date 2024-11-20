import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const DynamicIcon = ({name, classes, strokeWidth}: {name:string, classes?:string, strokeWidth?:number}) => {
    const IconComponent = (LucideIcons[name as keyof typeof LucideIcons] as LucideIcon) || null
    if (!IconComponent) {
        // console.warn(`Icon ${name} not found`)
        // return <LucideIcons.FileWarning className={classes} strokeWidth={strokeWidth ?? 2}/>;
        return (
            <div
                className={`flex items-center justify-center text-center ${classes} font-medium text-lg lg:text-xl break-words pointer-events-none lg:pointer-events-auto`}
            >
                <p>{name}</p>
            </div>
        )
    }

    return <IconComponent className={classes} strokeWidth={strokeWidth ?? 2}/>;
}