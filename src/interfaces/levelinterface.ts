export interface Nivel {
    id: number
    nombreNivel: string
    descripcionNivel: string
    iconoNivel: string,
    statusNivel: number
    progreso: number
    bloqueado: boolean
}

export interface UserProgress {
    completedLevels: number[]
}