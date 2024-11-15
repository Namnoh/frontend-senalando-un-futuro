import 'server-only';
import { Nivel, UserProgress } from '@/interfaces/levelinterface'

const mockLevels: Nivel[] = [
    {id: 1, nombreNivel: "Nivel Básico",descripcionNivel: `En este nivel veras categorias como:  \nAnimales \nAbecedario \nNumeros \nColores` , iconoNivel: 'BookOpen',statusNivel: 1,bloqueado: false},
    {id: 2,nombreNivel: "Nivel Intermedio",descripcionNivel: `En este nivel veras categorias como:  \nAnimales \nAbecedario \nNumeros \nColores`,iconoNivel: 'Book',statusNivel: 2,bloqueado: true},
    {id: 3,nombreNivel: "Nivel Avanzado",descripcionNivel: "Domina técnicas avanzadas", iconoNivel: 'GraduationCap', statusNivel: 3,  bloqueado: true }
]

// Función para obtener el progreso del usuario
export async function fetchUserProgress(idUsuario: number): Promise<UserProgress> {
    try {
        const response = await fetch(`${process.env.API_URL}/progreso/usuario/${idUsuario}`, {
            method: 'GET',
            // TODO: ELIMINAR ESTO EN PROD
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error('Error al obtener el progreso del usuario');
        }
        const data: UserProgress = await response.json();
        return data;
    } catch (error) {
        console.error('Error en fetchUserProgress:', error);
        throw error; // Lanza el error para que el componente pueda manejarlo
    }
}
// UPDATE
export async function updateProgress(userProgress: UserProgress, idProgreso:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/progreso/${idProgreso}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProgress),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al actualizar el progreso: ${errorData.message || response.statusText}`);
        };
        const progress: UserProgress = await response.json();
        return { success:true, data:progress };
    } catch (error) {
        console.error("Error en updateWord:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// Función para actualizaar el progreso del usuario
export async function updateUserProgress(idUsuario: number): Promise<UserProgress> {
    try {
        const response = await fetch(`${process.env.API_URL}/progreso/usuario/${idUsuario}`);
        if (!response.ok) {
            throw new Error('Error al obtener el progreso del usuario');
        }
        const data: UserProgress = await response.json();
        return data;
    } catch (error) {
        console.error('Error en fetchUserProgress:', error);
        throw error; // Lanza el error para que el componente pueda manejarlo
    }
}

// Función para obtener el nombre del nivel
export async function getLevelTitle(id:number):Promise<string>{
    const name = await mockLevels.find(l => l.id == id )?.nombreNivel.toLowerCase(); 
    return name?.split(' ')[1] ?? '';
}


// Función para obtener los datos de un nivel específico
export async function getLevelData(idNivel: number): Promise<Nivel | undefined> {
    return mockLevels.find(level => level.id === idNivel);
}

// Función para obtener el ID y el nombre de un nivel
export async function getLevelBasics(idNivel: number): Promise<[number | undefined, string | undefined]> {
    const level = mockLevels.find(level => level.id === idNivel);
    return level ? [level.id, level.nombreNivel.toLowerCase()] : [undefined, undefined];
}