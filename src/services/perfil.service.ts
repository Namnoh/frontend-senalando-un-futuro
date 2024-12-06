import { perfil } from '@/interfaces/perfilinterface';
import { Usuario } from '@/interfaces/usuarioInterface'
import { getSession } from 'next-auth/react';

// esta vaina representa la API
export async function fetchUser(idUsuario: number): Promise<Usuario> {
    try {
        const response = await fetch(`${process.env.API_URL}/users/${idUsuario}`,{
            cache: 'no-cache'
        });
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
export async function changePassword(userId: number, currentPassword: string, newPassword: string) {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error('No hay sesión activa');
        }
    
        const response = await fetch('/api/perfil/changePassword', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                currentPassword,
                newPassword
            }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || 'Error al cambiar la contraseña');
        }
    
        return { success: true };
        } catch (error) {
            console.error('Error en changePassword:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Error desconocido al cambiar la contraseña'
        };
    }
}