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

export function DeleteBtn({id}: {id:number}) {
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
                    <Button type="submit" variant="destructive">Eliminar Definitivamente</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </>
    )
};