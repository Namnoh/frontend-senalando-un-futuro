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

export function DeleteBtn({id, type}: {id:number, type:string}) {
    function handleRemoveItem(id:number) {
        console.log(id);
        console.log(type);
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
                    <Button type="submit" onClick={() => handleRemoveItem(id)} variant="destructive">Eliminar Permanentemente</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </>
    )
};