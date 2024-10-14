"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import ActionOptions from "../components/actionOptions";
import { Usuario } from "@/interfaces/usuarioInterface";
import FilterAscDesc from "@/components/customUI/table/filterAscDesc";

export const columns: ColumnDef<Usuario>[] = [
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
        accessorKey: "idUsuario",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    ID
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "nombreUsuario",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    Nombre
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "apellidoUsuario",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    Apellido
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "correoUsuario",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    Correo
                </FilterAscDesc>
            )
        },
    },
    {
        accessorKey: "idRol",
        header: ({ column, table }) => {
            return (
                <FilterAscDesc table={table} column={column}>
                    ID Rol
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

// {
//     accessorKey: "amount",
//     header: () => <div className="text-right text-lg">Amount</div>,
//     cell: ({ row }) => {
//         const amount = parseFloat(row.getValue("amount"))
//         const formatted = new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "USD",
//         }).format(amount)
//         return <div className="text-right font-medium">{formatted}</div>
//     },
// },