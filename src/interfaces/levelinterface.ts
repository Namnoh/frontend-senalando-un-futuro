import { User } from "next-auth"

export interface Nivel {
    id: number
    nombreNivel: string
    descripcionNivel: string
    iconoNivel: string,
    statusNivel: number
    bloqueado: boolean
}

export interface UserProgress {
    idProgreso : number  
    categoriasProgreso : Record<string, unknown> ,      
    palabrasProgreso : Record<string, unknown>
    porcentajeNivel : number
    idNivel : number
    nivel?: Nivel;
    idUsuario : number         
    usuario?: User;
}