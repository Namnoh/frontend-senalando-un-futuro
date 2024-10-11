import { OnlyTableProp } from '@/interfaces/dataTableProps'

export default function SelectedOptions<TData>({table}:OnlyTableProp<TData>) {
    return (
        <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
    )
};