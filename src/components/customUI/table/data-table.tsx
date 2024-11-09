"use client"
import * as React from "react";

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
} from "@/components/ui/table";
import BarraBusqueda from "./barraBusqueda";
import { DataTableProps } from "@/interfaces/dataTableProps";
import DropDownOptions from "./dropDownOptions";
import EncabezadoTabla from "./encabezadoTabla";
import ContenidoTabla from "./contenidoTabla";
import SelectedOptions from "./selectedOptions";
import PaginationBtns from "./paginationBtns";
import CleanFilters from "./cleanFilters";

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <BarraBusqueda table={table} />
                <DropDownOptions table={table} />
                <CleanFilters table={table} />
            </div>
            <div className="rounded-md border bg-background">
                <Table>
                    <EncabezadoTabla table={table}/>
                    <ContenidoTabla table={table} columns={columns}/>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <SelectedOptions table={table}/>
                <PaginationBtns table={table}/>
            </div>
        </div>
    )
};