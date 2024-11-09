import { Skeleton } from '@/components/ui/skeleton';

export function MiniCardGalerySkeleton({length}: {length:number}) {
    return (
        <div className='flex flex-wrap justify-center gap-5 w-2/3'>
            {Array.from({length: length}).map((_, index) => (
                <div key={index} className='flex items-center justify-center rounded-md shadow-md'>   
                    <Skeleton className="h-[110px] w-[110px] lg:h-[120px] lg:w-[120px]" />
                </div>
            ))}
        </div>
    )
};