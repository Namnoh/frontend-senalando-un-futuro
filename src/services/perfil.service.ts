import { perfil } from '@/interfaces/perfilinterface'
import { Usuario } from '@/interfaces/usuarioInterface'

// esta vaina representa la API
    export async function fetchUser(idUsuario: number): Promise<Usuario> {
        try {
            const response = await fetch(`${process.env.API_URL}/users/${idUsuario}`);
            if (!response.ok) {
                throw new Error('Error al obtener el progreso del usuario');
            }
            const data: Usuario = await response.json();
            return data;
        } catch (error) {
            console.error('Error en fetchUserProgress:', error);
            throw error; // Lanza el error para que el componente pueda manejarlo
        }
    }
    