import { Vista } from "@/interfaces/vistaInterface";

// Links donde no mostrar la navbar
const guestPaths = ['/login', '/register'];
const commonPaths = ['/', '/sobreNosotros'];
const adminPaths = ['/administracion'];

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
export async function getSidebarLinks(isAuth:boolean, isAdmin:boolean): Promise<Vista[]> {
    const filteredViews = views.filter(v => {
        const isGuestPath = guestPaths.includes(v.hrefVista);
        const isCommonPath = commonPaths.includes(v.hrefVista);
        const isAdminPath = adminPaths.includes(v.hrefVista);

        if (!isAuth) {
            return isGuestPath || isCommonPath;
        } else if (isAuth) {
            if (isAdmin) { return !isGuestPath; }
            return !isGuestPath && !isAdminPath;
        } return false;
    });
    return filteredViews;
};