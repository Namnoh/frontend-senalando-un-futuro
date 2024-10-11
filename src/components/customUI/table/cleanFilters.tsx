import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Table } from '@tanstack/react-table';
import { FilterX } from 'lucide-react';

export default function CleanFilters<TData>({table}: {table:Table<TData>}) {
    const currentSorting = table.getState().sorting
    const currentFiltering = table.getState().columnFilters
    const currentGlobalFilter = table.getState().globalFilter

    const isFiltering = currentSorting.length > 0 || currentFiltering.length > 0 || currentGlobalFilter !== undefined

    const cleanFilters = () => {
        table.resetSorting()
        table.resetColumnFilters()
        table.setGlobalFilter(undefined)
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={`${!isFiltering ? 'cursor-default' : ''}`}>
                    <Button
                        variant="outline"
                        onClick={cleanFilters}
                        className={`text-lg ml-5`}
                        disabled={!isFiltering}
                    >
                        <FilterX className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={-100} className='mt-1'>
                    <p>Limpiar Todos los Filtros</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};