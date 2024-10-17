export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoUsuario: string;
    contrasenaUsuario: number;
    idRol: number;
};

export type NuevoUsuario = Omit<Usuario, 'contrasenaUsuario'>;