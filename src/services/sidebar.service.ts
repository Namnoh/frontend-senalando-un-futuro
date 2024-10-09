import {
    CirclePlus,
    FastForward,
    Home,
    Info,
    LogOut,
    Search,
    User,
} from "lucide-react";
import { Vista } from "@/interfaces/vistaInterface";

// Links donde no mostrar la navbar
const hideSidebarPaths = ['/login', '/register'];

// Links Sidebar
const links: Vista[] = [
    {idVista:1 ,hrefVista: "#", iconoVista: Search, tituloVista: 'Buscar Palabras',},
    {idVista:2 ,hrefVista: "/niveles", iconoVista: Home, tituloVista: 'Niveles',},
    {idVista:3 ,hrefVista: "#", iconoVista: FastForward, tituloVista: 'Tu progreso',},
    {idVista:4 ,hrefVista: "/quienesSomos", iconoVista: Info, tituloVista: 'Sobre Nosotros',},
    {idVista:5 ,hrefVista: "#", iconoVista: User, tituloVista: 'Perfil',},
    {idVista:6 ,hrefVista: "/administracion", iconoVista: CirclePlus, tituloVista: 'Administración',},
    {idVista:7 ,hrefVista: "/login", iconoVista: LogOut, tituloVista: 'Cerrar Sesión',},
]

// TODO: Obtener links según rol de usuario 
export async function getSidebarLinks() {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    return links;
}

// Función para mostrar la navbar dependiendo del path
export const showSidebar = (props:{pathName:string}) => {
    const result = !hideSidebarPaths.includes(props.pathName);
    return result;
}