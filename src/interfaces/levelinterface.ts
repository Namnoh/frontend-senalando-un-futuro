export interface Nivel {
    id: number
    nombreNivel: string
    descripcionNivel: any
    iconoNivel: string,
    statusNivel: number
    progreso: number
    bloqueado: boolean
}

export interface UserProgress {
    completedLevels: number[]
}