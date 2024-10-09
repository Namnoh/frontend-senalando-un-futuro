import { Input } from "@/components/ui/input"
import { OnlyTableProp } from "@/interfaces/dataTableProps"

export default function BarraBusqueda<TData>({table}:OnlyTableProp<TData>) {
    return (
        <Input
            placeholder="Filtrar Correos..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
    )
};