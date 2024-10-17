'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteBtn } from "./deleteBtn";
import { Dialog } from "@/components/ui/dialog";
import { EditCreateBtn } from "./editCreateBtn";
import { Usuario } from "@/interfaces/usuarioInterface";
import { Categoria } from "@/interfaces/categoriaInterface";
import { Palabra } from "@/interfaces/palabraInterface";
import { isCategoria, isPalabra, isUsuario } from "@/services/common.service";
import { useState } from "react";

type ActionOptionsProp = {
    item?: Usuario | Categoria | Palabra;
}

export default function ActionOptions({item}: ActionOptionsProp) {
    const [isModOpen, setIsModOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false)

    const closeDialog = () => {
        setIsModOpen(false);
        setIsDelOpen(false);
    };
    
    let itemId: number = 0;
    let type: string = '';
    if (item) {
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
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir acciones</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <Dialog open={isModOpen} onOpenChange={setIsModOpen}>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="hover:bg-accent hover:text-white"
                    >
                        <EditCreateBtn type={type} item={item} closeDialog={closeDialog}/>
                    </DropdownMenuItem>
                </Dialog>
                <DropdownMenuSeparator />
                <Dialog open={isDelOpen} onOpenChange={setIsDelOpen}>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="focus:bg-destructive-400 hover:bg-destructive-400 focus:text-white hover:text-white"
                    >
                        <DeleteBtn id={itemId} type={type} closeDialog={closeDialog}/>
                    </DropdownMenuItem>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}