import { Usuario } from '@/interfaces/usuarioInterface';

const users:Usuario[] = [
    {idUsuario: 1, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    {idUsuario: 2, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    {idUsuario: 3, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    {idUsuario: 4, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    {idUsuario: 5, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    {idUsuario: 6, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    {idUsuario: 7, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    {idUsuario: 8, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    {idUsuario: 9, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    {idUsuario: 10, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    {idUsuario: 11, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    {idUsuario: 12, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    {idUsuario: 13, nombreUsuario: 'Alfredo', apellidoUsuario: 'Galdames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
    {idUsuario: 14, nombreUsuario: 'Fernando', apellidoUsuario: 'Muñoz', correoUsuario:'fe.munozf@duocuc.cl', idRol:0},
    {idUsuario: 15, nombreUsuario: 'Jean', apellidoUsuario: 'Venegas', correoUsuario:'je.venegasa@duocuc.cl', idRol:0},
    {idUsuario: 16, nombreUsuario: 'Alfredo', apellidoUsuario: 'NoGaldames', correoUsuario:'alfr.galdames@duocuc.cl', idRol:0},
]

export async function getUsers(idUsuario:number) {
    // TODO: Revisar qué pasa cuando la petición se demora
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const user = users.find(user => user.idUsuario === Number(idUsuario));
    return user;
};

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getAllUsers():Promise<Usuario[]> {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    // const usersList = users;
    return users;
};