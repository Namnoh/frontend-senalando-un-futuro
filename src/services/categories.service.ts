'use server'

import { Categoria } from '@/interfaces/categoriaInterface';

const categories:Categoria[] = [
    // {idCategoria: 1, nombreCategoria: "Abecedario", descripcionCategoria:'', iconoCategoria: 'ArrowDownAZ', bgCategoria: 'https://plus.unsplash.com/premium_photo-1666739032615-ecbd14dfb543?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', idNivel: 1, status: 0},
    // {idCategoria: 2, nombreCategoria: "Animales", descripcionCategoria:'', iconoCategoria: 'Cat', bgCategoria: 'https://amazonianproject.org/wp-content/uploads/2017/11/Rainforest_5.jpg', idNivel: 1, status: .55},
    // {idCategoria: 3, nombreCategoria: "Colores", descripcionCategoria:'', iconoCategoria: 'Palette', bgCategoria: 'a', idNivel: 1, status: 0},
    // {idCategoria: 4, nombreCategoria: "Números", descripcionCategoria:'', iconoCategoria: 'ArrowUp10', bgCategoria: 'a', idNivel: 1, status: 1},
    // {idCategoria: 5, nombreCategoria: "Ejemplo", descripcionCategoria:'', iconoCategoria: 'Home', bgCategoria: 'a', idNivel: 2, status: 1},
]

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getAllCategories() {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Error al obtener las categorias: ${response.statusText}`);
        };
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error en getAllCategories:", error);
        return[];
    };
};

export async function getCategory(idCategoria:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/${idCategoria}`);
        if (!response.ok) {
            throw new Error(`Error al obtener la categoría: ${response.statusText}`);
        };
        const category = await response.json();
        return category;
    } catch (error) {
        console.error("Error en getCategory:", error);
        return[];
    };
};

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getCategoriesFrom(idNivel:number) {
    try {
        const response= await fetch(`${process.env.API_URL}/categories/getAllByLevel/${idNivel}`);
        if (!response.ok) {
            throw new Error(`Error al obtener las categorías: ${response.statusText}`);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error en getCategoriesFrom:", error);
        return[];
    };
};

export async function getCategoryTitle(idCategoria:number):Promise<string>{
    const name = await categories.find(c => c.idCategoria == idCategoria )?.nombreCategoria.toLowerCase(); 
    return name ?? '';
}

export async function getCategoryBasics(idCategoria:number):Promise<[number | undefined, string | undefined]>{
    const id = await categories.find(c => c.idCategoria == idCategoria )?.idCategoria;
    const name = await categories.find(c => c.idCategoria == idCategoria )?.nombreCategoria.toLowerCase(); 
    return id ? [id, name] : [undefined, undefined];
}