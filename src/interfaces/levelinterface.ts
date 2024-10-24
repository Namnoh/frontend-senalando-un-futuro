import { User } from "next-auth"

export interface Nivel {
    id: number
    nombreNivel: string
    descripcionNivel: string
    iconoNivel: string,
    statusNivel: number
    bloqueado: boolean
}

export type CategoriaProgreso = {
    idCategoria: number;
    nombreCategoria: string;
    progresoCategoria: number;
}

export type PalabraProgreso = {
    idPalabra: number;
    nombrePalabra: string;
}

export interface UserProgress {
    idProgreso : number  
    categoriasProgreso : Record<string, CategoriaProgreso> ,      
    palabrasProgreso : Record<string, PalabraProgreso>
    porcentajeNivel : number
    idNivel : number
    nivel?: Nivel;
    idUsuario : number         
    usuario?: User;
}