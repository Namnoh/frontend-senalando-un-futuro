import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OnlyTableProp } from "@/interfaces/dataTableProps";
import { flexRender } from '@tanstack/react-table';

export default function EncabezadoTabla<TData>({table}:OnlyTableProp<TData>) {
    return (
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </TableHead>
                        )
                    })}
                </TableRow>
            ))}
        </TableHeader>
    )
}
