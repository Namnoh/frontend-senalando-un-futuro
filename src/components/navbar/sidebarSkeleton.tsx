import { Skeleton } from '@/components/ui/skeleton';

export function SidebarSkeleton() {
    return (
        <aside className="fixed w-16 h-screen border-r flex flex-col items-center gap-5">
            <Skeleton className="mt-5 w-10 h-10" /> 
            <div className='mt-5 flex flex-col items-center gap-8'>
                {Array.from({length: 6}).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-8" />
                ))}
            </div>
            <div className='mt-auto mb-5'>
                <Skeleton className="h-8 w-8" />
            </div>
        </aside> 
    )
};

export function MobileNavSkeleton() {
    return (
        <div className='fixed p-5'>
            <Skeleton className="h-10 w-10" />
        </div>
    )
};