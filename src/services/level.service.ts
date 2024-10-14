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

export async function getLevelTitle(id:number):Promise<string>{
    const name = await mockLevels.find(l => l.id == id )?.nombreNivel.toLowerCase(); 
    return name?.split(' ')[1] ?? '';
}

export async function getLevelData(idNivel:number) {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const level = mockLevels.find(level => level.id === Number(idNivel));
    return level;
}

export async function getLevelBasics(idNivel:number):Promise<[number | undefined, string | undefined]>{
    const id = await mockLevels.find(level => level.id == idNivel )?.id;
    const name = await mockLevels.find(level => level.id == idNivel )?.nombreNivel.toLowerCase(); 
    return id ? [id, name] : [undefined, undefined];
}