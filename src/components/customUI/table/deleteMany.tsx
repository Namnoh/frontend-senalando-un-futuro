import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';
import { isCategoria, isPalabra, isUsuario } from '@/services/common.service';
import { Table } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteManyProps<TData> {
    table: Table<TData>;
}

export default function DeleteMany<TData>({ table }: DeleteManyProps<TData>) {
    const [isDeleting, setIsDeleting] = useState(false);

    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasSelectedRows = selectedRows.length > 0;

    const handleDelete = async (ids: number[], type:string) => {
        try {
            const response = await fetch(`/api/crud/${type}/deleteMany/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids)
            });
            const responseData = await response.json();
            if (!response.ok || responseData.error) {
                throw new Error(responseData.error || `Error al eliminar el registro: ${response.statusText}`);
            }
            toast({
                title: ids.length > 1 ? "Registros eliminados correctamente" : "Registro eliminado correctamente",
                description: "Por favor refresque la tabla para ver los resultados.",
                variant: "success"
            });
        } catch (error) {
            console.error("Error en delete:", (error instanceof Error) ? error.message : 'Error desconocido');
            const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    const deleteSelected = async () => {
        if (!hasSelectedRows) return;

        setIsDeleting(true);
        try {
            let itemId: number = 0;
            let type: string = '';
            const selectedIds = selectedRows.map((row) => {
                const item = row.original;
                if (isUsuario(item)) {
                    itemId = item.idUsuario;
                    type = 'users';
                } else if (isCategoria(item)) {
                    itemId = item.idCategoria;
                    type = 'categories';
                } else if (isPalabra(item)) {
                    itemId = item.idPalabra;
                    type = 'words';
                } else {
                    throw new Error('Tipo de item no reconocido');
                }
                return itemId
            });
            await handleDelete(selectedIds, type);
            // table.resetRowSelection();
        } catch (error) {
            console.error('Error deleting rows:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        onClick={deleteSelected}
                        className="text-lg ml-5"
                        disabled={!hasSelectedRows || isDeleting}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                    <TooltipContent sideOffset={-100} className='mt-1'>
                        <p>{isDeleting ? 'Eliminando...' : 'Eliminar Registros Seleccionados'}</p>
                    </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};