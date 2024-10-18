export interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoUsuario: string;
    contrasenaUsuario: string;
    idRol: number;
};

export interface UsuarioRes {
    idUsuario: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoUsuario: string;
    contrasenaUsuario: string;
    confirmPassword: string;
    idRol: number;
};
export type NuevoUsuario = Omit<Usuario, 'contrasenaUsuario'>;