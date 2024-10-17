import 'server-only';

import { NuevoUsuario, Usuario } from '@/interfaces/usuarioInterface';

const users:Usuario[] = [
    // {idUsuario: 1, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    // {idUsuario: 2, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    // {idUsuario: 3, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    // {idUsuario: 4, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    // {idUsuario: 5, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    // {idUsuario: 6, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    // {idUsuario: 7, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    // {idUsuario: 8, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    // {idUsuario: 9, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    // {idUsuario: 10, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    // {idUsuario: 11, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    // {idUsuario: 12, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    // {idUsuario: 13, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    // {idUsuario: 14, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    // {idUsuario: 15, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    // {idUsuario: 16, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
];

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

export async function getUser(idUsuario:number) {
    // TODO: Revisar qué pasa cuando la petición se demora
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const user = users.find(user => user.idUsuario === Number(idUsuario));
    return user;
};