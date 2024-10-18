import 'server-only';

import { NuevoUsuario, Usuario } from '@/interfaces/usuarioInterface';

// * INICIO DE CRUD USUARIOS

// CREATE
// Función para generar una contraseña aleatoria
function generarContrasena(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let contrasena = '';
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres[indiceAleatorio];
    }
    return contrasena;
};

export async function createUser(newUser:NuevoUsuario) {
    try {
        // Generar una contraseña aleatoria
        const contrasenaGenerada = generarContrasena(12); 
        const usuarioCompleto = {
            ...newUser,
            contrasenaUsuario: contrasenaGenerada,
        };
        const response = await fetch(`${process.env.API_URL}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioCompleto),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al crear al usuario: ${errorData.message || response.statusText}`);
        };
        const user = await response.json();
        return {success:true, data:user};
    } catch (error) {
        console.error("Error en createUser:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// READ
export async function getAllUsers():Promise<Usuario[]> {
    try {
        const response = await fetch(`${process.env.API_URL}/users/`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Error al obtener los usuarios: ${response.statusText}`);
        };
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Error en getAllUsers:", error);
        return[];
    };
};

// UPDATE
export async function updateUser(user: NuevoUsuario, idUsuario:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/users/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al actualizar el usuario: ${errorData.message || response.statusText}`);
        };
        console.log("UPDATE USER: ")
        console.log(response)
        return { success:true, data:response };
    } catch (error) {
        console.error("Error en updateUser:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// DELETE
export async function deleteUser(idUsuario:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/users/${idUsuario}`, {
            method: 'DELETE',
        });
        console.log()
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al eliminar el usuario categoria: ${errorData.message || response.statusText}`);
        };
        const categoria = await response.json();
        return {success:true, data:categoria};
    } catch (error) {
        console.error("Error en deleteUser:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// * FIN DE CRUD USUARIOS


// export async function getUser(idUsuario:number) {
//     // TODO: Revisar qué pasa cuando la petición se demora
//     const user = users.find(user => user.idUsuario === Number(idUsuario));
//     return user;
// };