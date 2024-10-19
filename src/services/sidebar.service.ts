import { Vista } from "@/interfaces/vistaInterface";


// Links donde no mostrar la navbar
const guestPaths = ['/login', '/register'];
const commonPaths = ['/', '/sobreNosotros'];
const authenticatedPaths = ['/perfil', '/administracion', '/logOut'];

// Links Sidebar
const views: Vista[] = [
    {idVista:1 ,hrefVista: "#", iconoVista: 'Search', tituloVista: 'Buscar Palabras',},
    {idVista:2 ,hrefVista: "/", iconoVista: 'Home', tituloVista: 'Inicio',},
    {idVista:3 ,hrefVista: "/niveles", iconoVista: 'GraduationCap', tituloVista: 'Niveles',},
    {idVista:4 ,hrefVista: "/sobreNosotros", iconoVista: 'Info', tituloVista: 'Sobre Nosotros',},
    {idVista:5 ,hrefVista: "/perfil", iconoVista: 'User', tituloVista: 'Perfil',},
    {idVista:6 ,hrefVista: "/administracion", iconoVista: 'CirclePlus', tituloVista: 'Administración',},
    {idVista:7 ,hrefVista: "/login", iconoVista: 'LogIn', tituloVista: 'Iniciar Sesión',},
    {idVista:8 ,hrefVista: "/register", iconoVista: 'ClipboardPen', tituloVista: 'Registrarse',},
    {idVista:9 ,hrefVista: "/logOut", iconoVista: 'LogOut', tituloVista: 'Cerrar Sesión',},
]

// TODO: Obtener links según rol de usuario 
export async function getSidebarLinks(isAuth:boolean): Promise<Vista[]> {

    return views.filter(v => {
        const isGuestPath = guestPaths.includes(v.hrefVista);
        const isCommonPath = commonPaths.includes(v.hrefVista);
        const isAuthPath = authenticatedPaths.includes(v.hrefVista);

        if (isAuth) {
            return !isGuestPath || isCommonPath || isAuthPath;
        } else {
            return isGuestPath || isCommonPath;
        }
    });
}

// Función para mostrar la navbar dependiendo del path
// export const showSidebar = (props:{pathName:string}) => {
//     const result = !hideSidebarPaths.includes(props.pathName);
//     return result;
// }