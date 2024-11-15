"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import ActionOptions from "../../app/(protected)/(admin)/administracion/components/actionOptions";
import { Categoria } from "@/interfaces/categoriaInterface";
import FilterAscDesc from "@/components/customUI/table/filterAscDesc";

export const columns: ColumnDef<Categoria>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Seleccionar Todas"
                className="ml-[5px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Seleccionar Fila"
            />
        ),
    },
    {
        accessorKey: "idCategoria",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    ID
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "nombreCategoria",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    Nombre
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "descripcionCategoria",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    Descripción
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "iconoCategoria",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    Icono
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "bgCategoria",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    Fondo
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "idNivel",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    ID Nivel
                </FilterAscDesc>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original
            return (
                <ActionOptions item={item} />
            )
        },
    },
];