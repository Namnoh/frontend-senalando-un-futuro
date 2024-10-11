import { Nivel, UserProgress } from '@/interfaces/levelinterface'

const mockLevels: Nivel[] = [
    {id: 1, nombreNivel: "Nivel Básico",descripcionNivel: `En este nivel veras categorias como:  \nAnimales \nAbecedario \nNumeros \nColores` , iconoNivel: 'BookOpen',statusNivel: 1,progreso: 90,bloqueado: false},
    {id: 2,nombreNivel: "Nivel Intermedio",descripcionNivel: `En este nivel veras categorias como:  \nAnimales \nAbecedario \nNumeros \nColores`,iconoNivel: 'Book',statusNivel: 2,progreso: 0,bloqueado: true},
    {id: 3,nombreNivel: "Nivel Avanzado",descripcionNivel: "Domina técnicas avanzadas", iconoNivel: 'GraduationCap', statusNivel: 3, progreso: 0,  bloqueado: true }
]

const mockUserProgress: UserProgress = {
  completedLevels: [1] // El usuario ha completado el nivel 1
}

export async function getLevel(levelId: number): Promise<Nivel | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const level = mockLevels.find(level => level.id === levelId);
            if (level) {
                if (level.id === 1) {
                    // El primer nivel nunca debe estar bloqueado
                    level.bloqueado = false;
                } else {
                    // Buscar el nivel anterior solo si no es el primer nivel
                    const nivelAnterior = mockLevels.find(n => n.id === level.id - 1);
                    level.bloqueado = nivelAnterior ? nivelAnterior.progreso < 100 : true;
                }
            }
            resolve(level || null);
        }, 500);
    });
}
export async function getUserProgress(): Promise<UserProgress> {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve(mockUserProgress)
        }, 500)
    })
}