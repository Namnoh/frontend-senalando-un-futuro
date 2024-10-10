import React from 'react'
import { Button } from "@/components/ui/button";
import { ArrowDownUp, ArrowUpDown, FilterX } from "lucide-react";
import { Column, Table } from '@tanstack/react-table';

interface FilterAscDescProps<TData> {
    children: React.ReactNode
    column: Column<TData, unknown>
    table: Table<TData>
}

export default function FilterAscDesc<TData>({children, column, table}:FilterAscDescProps<TData>) {
    const handleSort = () => {
        const currentSorting = table.getState().sorting
        const columnId = column.id
        const currentColumnSort = currentSorting.find(sort => sort.id === columnId)

        let newSorting
        if (!currentColumnSort) {
            // Si la columna no está ordenada, la añade al final del array de ordenamiento
            newSorting = [...currentSorting, { id: columnId, desc: false }]
        } else if (currentColumnSort.desc) {
            // Si está ordenada descendentemente, la elimina del ordenamiento
            newSorting = currentSorting.filter(sort => sort.id !== columnId)
        } else {
            // Si está ordenada ascendentemente, cambia a descendente
            newSorting = currentSorting.map(sort => 
                sort.id === columnId ? { ...sort, desc: true } : sort
            )
        }
        table.setSorting(newSorting)
    };

    const getSortIcon = () => {
        const sortStatus = column.getIsSorted()
        if (sortStatus === false) return ''
        return sortStatus === "asc" 
            ? <ArrowUpDown className="ml-2 h-5 w-5" />
            : <ArrowDownUp className="ml-2 h-5 w-5" />
    }
    return (
        <Button
            variant="ghost"
            onClick={handleSort}
            className="text-lg p-1"
        >
            {children}
            {getSortIcon()}
        </Button>
    )
};