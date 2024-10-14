import { Skeleton } from '@/components/ui/skeleton';

type TableSkeletonProps = {
    search?: boolean;
    columns?: boolean;
    clear?: boolean;
    selectedRows?: boolean;
    pagination?: boolean;
}
export function TableSkeleton({ search, columns, clear, selectedRows, pagination }: TableSkeletonProps) {
    return (
        <>
            <div className='flex items-center py-4'>
                {search ? <Skeleton className='h-9 w-full max-w-sm' /> : ''}
                {columns ? <Skeleton className='h-9 w-24 ml-auto' /> : ''}
                {clear ? <Skeleton className='h-9 w-12 ml-5' /> : ''}
            </div>
            <div className='rounded-md border'>
                <Skeleton className='w-full h-80'/>
                {/* <div className='w-full'>
                    <div className='flex justify-evenly p-2'>
                        {Array.from({length: 5}).map((_, index) => (
                            <Skeleton key={index} className='h-9 w-20' />
                        ))}
                    </div>
                    {Array.from({length: length}).map((_, index) => (
                        <div key={index} className='flex justify-evenly p-2 py-3'>
                            {Array.from({length: 5}).map((_, index) => (
                                <Skeleton key={index} className='h-7 w-20' />
                            ))}
                        </div>
                    ))}
                </div> */}
            </div>
            <div className='flex items-center justify-between space-x-2 py-4'>
                {selectedRows ? <Skeleton className='h-5 w-52' /> : ''}
                {pagination ? 
                    <div className='flex gap-5'> <Skeleton className='h-7 w-20'/> <Skeleton className='h-7 w-20'/> </div>
                : ''}
            </div>
        </>
    )
};