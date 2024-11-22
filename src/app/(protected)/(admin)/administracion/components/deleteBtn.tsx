'use client';

import { Button } from "@/components/ui/button"
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export function DeleteBtn({id, type, closeDialog}: {id:number, type:string, closeDialog:() => void}) {
    const [ isLoading, setIsLoading ] = useState(false)
    const { toast } = useToast();

    async function handleRemoveItem(id:number) {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/crud/${type}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (!response.ok || responseData.error) {
                throw new Error(responseData.error || `Error al eliminar el registro: ${response.statusText}`);
            }
            toast({
                title: "Éxito",
                description: "Registro eliminado correctamente",
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
        } finally {
            setIsLoading(false);
            closeDialog();
        }
    }
    return (
        <>
            <DialogTrigger asChild>
                <Button variant="fullGhost" className="h-full w-full p-0 flex justify-start hover:text-white">Eliminar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Eliminar Registro</DialogTitle>
                    <DialogDescription>
                        Eliminarás el registro de forma PERMANENTE.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row sm:justify-between w-full">
                    { isLoading ? (
                        <LoaderCircle className={`animate-spin text-primary h-8 w-8`}/>
                    ) : (
                        <Button type="submit" onClick={() => handleRemoveItem(id)} variant="destructive">Eliminar Permanentemente</Button>
                    )}
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </>
    )
};