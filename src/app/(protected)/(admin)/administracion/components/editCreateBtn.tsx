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
import { CirclePlus } from "lucide-react";

type AllTextContent = {
    title: 'Crear Registro' | 'Editar Registro',
}

export function EditCreateBtn({create, item}: {create:boolean, item?:any}) {
    let textContent: AllTextContent;

    if (!item) {
        textContent = { title: 'Crear Registro' }
    } else {
        textContent = { title: 'Editar Registro' }
    }

    return (
        <>
            <DialogTrigger asChild>
                {!item ? (
                        <Button><CirclePlus/></Button>
                    ) : (
                        <Button variant="fullGhost" className="h-full w-full p-0 flex justify-start hover:text-white">Editar</Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{textContent.title}</DialogTitle>
                    <DialogDescription>
                        Completa los campos.
                    </DialogDescription>
                </DialogHeader>
                {/* Contenido Formulario */}
                {/* {!item ? (
                        // Renderizar componente formulario crear
                    ) : (
                        // Renderizar componente formulario actualizar
                    )
                } */}
                <DialogFooter className="flex flex-row sm:justify-between w-full">
                    {!item ? (
                            <Button type="submit" variant="default" className="text-background">Crear Registro</Button>
                        ) : (
                            <Button type="submit" variant="default" className="text-background">Actualizar Registro</Button>
                        )
                    }
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </>
    )
};