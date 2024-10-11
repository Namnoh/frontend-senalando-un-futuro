import React from 'react'
import { BadgeCheck, CircleEllipsis } from "lucide-react";

export default function ProgressBadge({status}: {status:any}) {
    return (
        <>
            <div className={`${status == 1 || status == true ? '' : 'hidden'} absolute -right-2 -bottom-2 bg-background rounded-full text-green-400 z-10`}>
                <BadgeCheck className='h-7 w-7'/>
            </div>
            {typeof status == 'number' && (
                <div className={`${status > 0 && status < 1 ? '' : 'hidden'} absolute -right-2 -bottom-2 bg-background rounded-full text-yellow-400 z-10`}>
                    <CircleEllipsis className='h-7 w-7'/>
                </div>
            )}
        </>
    )
}