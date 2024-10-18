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
    categoriasProgreso : Record<string, any> ,      
    palabrasProgreso : Record<string, any>
    porcentajeNivel : number
    idNivel : number 
    idUsuario : number         
}