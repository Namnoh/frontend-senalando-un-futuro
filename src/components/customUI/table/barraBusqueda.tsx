'use client'
import { Input } from "@/components/ui/input";
import { OnlyTableProp } from "@/interfaces/dataTableProps";
import { useEffect, useState } from "react";

export default function BarraBusqueda<TData>({table}:OnlyTableProp<TData>) {
    const [value, setValue] = useState("")

    // Función para aplicar el filtro global
    const applyFilter = (value: string) => {
        table.setGlobalFilter(value)
    }

    // Efecto para sincronizar el estado local con el filtro global de la tabla
    useEffect(() => {
        setValue(table.getState().globalFilter as string ?? "")
    }, [table.getState().globalFilter])

    // Función para manejar el cambio en el input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setValue(newValue)
        applyFilter(newValue)
    }

    return (
        <Input
            name="filtrarDatos"
            placeholder="Filtrar Datos..."
            value={value}
            // value={(table.getAllColumns().filter(r => ))}
            onChange={handleInputChange}
            className="max-w-sm bg-background"
        />
    )
};