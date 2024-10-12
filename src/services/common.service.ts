import { Categoria } from "@/interfaces/categoriaInterface";
import { Palabra } from "@/interfaces/palabraInterface";
import { Usuario } from "@/interfaces/usuarioInterface";

type newItem = Usuario | Categoria | Palabra;

export function isUsuario(item: newItem): item is Usuario {
    return 'idUsuario' in item && 'nombreUsuario' in item;
}

export function isCategoria(item: newItem): item is Categoria {
    return 'idCategoria' in item && 'nombreCategoria' in item;
}

export function isPalabra(item: newItem): item is Palabra {
    return 'idPalabra' in item && 'nombrePalabra' in item;
}