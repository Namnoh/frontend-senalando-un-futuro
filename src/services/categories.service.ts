import { ArrowDownAZ, ArrowUp10, Cat, Home, Palette } from 'lucide-react';

const categories = [
    {id: 1, nombre: "Abecedario", icono: ArrowDownAZ, bg: 'a', idNivel: 1},
    {id: 2, nombre: "Animales", icono: Cat, bg: 'https://amazonianproject.org/wp-content/uploads/2017/11/Rainforest_5.jpg', idNivel: 1},
    {id: 3, nombre: "Colores", icono: Palette, bg: 'a', idNivel: 1},
    {id: 4, nombre: "Números", icono: ArrowUp10, bg: 'a', idNivel: 1},
    {id: 5, nombre: "Ejemplo", icono: Home, bg: 'a', idNivel: 2},
]

export async function getCategory(idCategoria:number) {
    const category = categories.find(category => category.id === Number(idCategoria));
    return category;
}

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getCategoriesFrom(idNivel:number) {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const cats = categories.filter(category => category.idNivel === Number(idNivel));
    return cats;
}