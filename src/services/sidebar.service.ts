import {
    CirclePlus,
    FastForward,
    Home,
    Info,
    LogOut,
    Search,
    Users,
} from "lucide-react";

// Links donde no mostrar la navbar
const hideSidebarPaths = ['/login', '/register'];

// Links Sidebar
const links = [
    {href: "#", icon: Search, text: 'Buscar Palabras',},
    {href: "/", icon: Home, text: 'Niveles',},
    {href: "#", icon: FastForward, text: 'Tu progreso',},
    {href: "/quienesSomos", icon: Info, text: 'Sobre Nosotros',},
    {href: "#", icon: Users, text: 'Perfil',},
    {href: "#", icon: CirclePlus, text: 'Administración',},
    {href: "/login", icon: LogOut, text: 'Cerrar Sesión',},
]

// TODO: Obtener links según rol de usuario 
export const getSidebarLinks = () =>  {
    return links;
}

// Función para mostrar la navbar dependiendo del path
export const showSidebar = (props:{pathName:string}) => {
    const result = !hideSidebarPaths.includes(props.pathName);
    return result;
}