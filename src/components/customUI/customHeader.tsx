'use client'
import { TitleProp } from '@/interfaces/commonInterfaces'

type CustomHeaderProps = {
    children: Readonly<React.ReactNode>
    level:TitleProp,
    type?: string;
}

export default function CustomHeader({children, level, type}:CustomHeaderProps) {
    return (
        <>
            <h1 className="text-3xl mt-14 md:mt-10 font-medium md:text-4xl lg:text-5xl">
                {type && type === 'words' ? (
                    <span className='text-white'>NIVEL {level.idTitle} {level.nameTitle.toUpperCase()}</span>
                ) : (
                    <><span className="text-secondary">NIVEL {level.idTitle}</span> <span className="text-primary">{level.nameTitle.toUpperCase()}</span></>
                )}
            </h1>
            {children}
        </>
    )
}
