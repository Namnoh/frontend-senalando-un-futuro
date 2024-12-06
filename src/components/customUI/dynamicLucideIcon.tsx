import * as LucideIcons from 'lucide-react';
import { TypeIcon as type, LucideIcon } from 'lucide-react';
import * as Md from 'react-icons/md';
import * as Fa from 'react-icons/fa';
import * as Ai from 'react-icons/ai';
import * as Bs from 'react-icons/bs';
import * as Fi from 'react-icons/fi';
import * as Gi from 'react-icons/gi';
import * as Hi from 'react-icons/hi';
import * as Im from 'react-icons/im';
import * as Io from 'react-icons/io';
import * as Ri from 'react-icons/ri';
import * as Ti from 'react-icons/ti';
import * as Wi from 'react-icons/wi';
import * as Pi from 'react-icons/pi';
import { IconType } from 'react-icons';

const ReactIconsMap = { Md, Fa, Ai, Bs, Fi, Gi, Hi, Im, Io, Ri, Ti, Wi, Pi };

export const DynamicIcon = ({name, classes, strokeWidth}: {name: string, classes?: string, strokeWidth?: number}) => {
    // Buscar primero en Lucide Icons
    const LucideIconComponent = (LucideIcons[name as keyof typeof LucideIcons] as LucideIcon) || null;
    
    if (LucideIconComponent) {
        return <LucideIconComponent className={classes} strokeWidth={strokeWidth ?? 2}/>;
    }
    
    // Si no se encuentra en Lucide, buscar en React Icons
    const prefix = name.slice(0, 2);
    const IconSet = ReactIconsMap[prefix as keyof typeof ReactIconsMap];
    const ReactIconComponent = IconSet ? (IconSet[name as keyof typeof IconSet] as IconType) || null : null;
    
    if (ReactIconComponent) {
        return <ReactIconComponent className={classes} />;
    }
    
    // Si no se encuentra en ninguna biblioteca, devolver el texto
    return (
        <div
            className={`flex items-center justify-center text-center ${classes} font-medium text-lg lg:text-xl break-words pointer-events-none lg:pointer-events-auto`}
        >
            <p>{name}</p>
        </div>
    );
}