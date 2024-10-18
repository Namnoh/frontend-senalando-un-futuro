import { Categoria } from "@/interfaces/categoriaInterface";
import { Nivel } from "@/interfaces/levelinterface";
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
const mockLevels: Nivel[] = [
    {id: 1, nombreNivel: "Nivel Básico",descripcionNivel: `En este nivel veras categorias como:  \nAnimales \nAbecedario \nNumeros \nColores` , iconoNivel: 'BookOpen',statusNivel: 1,bloqueado: false},
    {id: 2,nombreNivel: "Nivel Intermedio",descripcionNivel: `En este nivel veras categorias como:  \nAnimales \nAbecedario \nNumeros \nColores`,iconoNivel: 'Book',statusNivel: 2,bloqueado: true},
    {id: 3,nombreNivel: "Nivel Avanzado",descripcionNivel: "Domina técnicas avanzadas", iconoNivel: 'GraduationCap', statusNivel: 3,  bloqueado: true }
]

export async function getLevel(levelId: number, idUsuario: number): Promise<Nivel | null> {
    try {
        // Primero obtenemos el progreso del usuario
        const response = await fetch(`/api/level/fetchUserProgress/${3}`);
        if (!response.ok) {
            throw new Error('Failed to fetch userProgress');
        };
        const userProgress = await response.json();
        
        const level = mockLevels.find(level => level.id === levelId);
        
        if (level) {
            // El primer nivel nunca debe estar bloqueado
            level.bloqueado = level.id !== 1 && userProgress.idNivel < level.id;
        }

        return level || null;
    } catch (error) {
        console.error('Error al obtener el nivel:', error);
        return null;
    }
}
