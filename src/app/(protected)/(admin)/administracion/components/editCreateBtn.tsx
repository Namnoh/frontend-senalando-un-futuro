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
import { UserForm } from "./formularios/usersForms/userForm";
import { CirclePlus } from "lucide-react";

type AllTextContent = {
    title: 'Crear Registro' | 'Editar Registro',
}

export function EditCreateBtn({type, item}: {type:string, item?:any}) {
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
                {type === 'users' ? (
                    // Renderizar componente formulario Usuario
                    <UserForm user={item ? item : null}/>
                ) : type === 'categories' ? (
                    // Renderizar componente formulario Categoria
                    <div>Categorias</div>
                ) : (
                    // Palabras
                    <div>Palabras</div>
                )}
            </DialogContent>
        </>
    )
};