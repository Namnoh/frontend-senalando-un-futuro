import { perfil } from '@/interfaces/perfilinterface'

// esta vaina representa la API
    let perfilMock: perfil = {
        idPerfil: 1, correoUsuario: 'usuario@ejemplo.com',contrasena: 'contraseña_encriptada', nombrePerfil: 'Miau Venegas'}
    
    export const perfilService = {
        obtenerPerfil: async (): Promise<perfil> => {
        // Esto simula la llama pa la API 
        await new Promise(resolve => setTimeout(resolve, 500))
        return { ...perfilMock, contrasena: '' } //En el vidio vi que esta vaina hace que no se devuelva la contraseña
        },
    
        actualizarPerfil: async (perfil: Partial<perfil>): Promise<perfil> => {
        // tambien simula la llama pa la api pero pal perfil chavalin
        await new Promise(resolve => setTimeout(resolve, 500))
        perfilMock = { ...perfilMock, ...perfil }
        return { ...perfilMock, contrasena: '' } 
        },
    
        cambiarContraseña: async (nuevaContraseña: string): Promise<void> => {
        // aqui se supone que se cambia la contraseña
        await new Promise(resolve => setTimeout(resolve, 500))
        perfilMock.contrasena = nuevaContraseña //creo que si la conectamos aqui funcionaria de pana
        console.log('Contraseña cambiada') //y esto por que soi choro pa que muestre si se cambio
        }
    }