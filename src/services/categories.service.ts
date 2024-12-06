import 'server-only';

import { Categoria } from '@/interfaces/categoriaInterface';
import { TitleProp } from '@/interfaces/commonInterfaces';
import { getLevelTitle } from './level.service';

const categories:Categoria[] = [
    // {idCategoria: 1, nombreCategoria: "Abecedario", descripcionCategoria:'', iconoCategoria: 'ArrowDownAZ', bgCategoria: 'https://plus.unsplash.com/premium_photo-1666739032615-ecbd14dfb543?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', idNivel: 1, status: 0},
    // {idCategoria: 2, nombreCategoria: "Animales", descripcionCategoria:'', iconoCategoria: 'Cat', bgCategoria: 'https://amazonianproject.org/wp-content/uploads/2017/11/Rainforest_5.jpg', idNivel: 1, status: .55},
    // {idCategoria: 3, nombreCategoria: "Colores", descripcionCategoria:'', iconoCategoria: 'Palette', bgCategoria: 'a', idNivel: 1, status: 0},
    // {idCategoria: 4, nombreCategoria: "Números", descripcionCategoria:'', iconoCategoria: 'ArrowUp10', bgCategoria: 'a', idNivel: 1, status: 1},
    // {idCategoria: 5, nombreCategoria: "Ejemplo", descripcionCategoria:'', iconoCategoria: 'Home', bgCategoria: 'a', idNivel: 2, status: 1},
]

// * INICIO CRUD CATEGORIA

// CREATE
export async function createCategory(category:Categoria) {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al crear la categoria: ${errorData.message || response.statusText}`);
        };
        const categoria = await response.json();
        return {success:true, data:categoria};
    } catch (error) {
        console.error("Error en createCategory:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// READ
// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getAllCategories() {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/`, {
            method: 'GET',
            cache: 'no-store'
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

// UPDATE
export async function updateCategory(category: Categoria, idCategoria:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/${idCategoria}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al actualizar la categoria: ${errorData.message || response.statusText}`);
        };
        const categoria = await response.json();
        return {success:true, data:categoria};
    } catch (error) {
        console.error("Error en createCategory:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// DELETE
export async function deleteCategory(idCategoria:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/${idCategoria}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al eliminar la categoria: ${errorData.message || response.statusText}`);
        };
        const categoria = await response.json();
        return {success:true, data:categoria};
    } catch (error) {
        console.error("Error en deleteCategory:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// DELETE MANY
export async function deleteManyCategories(idsCategories:number[]) {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/deleteManyCategories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idsCategories)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al eliminar la(s) categoria(s): ${errorData.message || response.statusText}`);
        };
        const user = await response.json();
        return {success:true, data:user};
    } catch (error) {
        console.error("Error en deleteManyCategories:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// * FIN CRUD CATEGORIA

export async function getCategory(idCategoria:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/categories/${idCategoria}`,{
            cache: 'no-store'
        });
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
        const response= await fetch(`${process.env.API_URL}/categories/getAllByLevel/${idNivel}`,{
            cache: 'no-store'
        });
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
};

export async function getCategoryBasics(category:Categoria):Promise<[number | undefined, string | undefined]>{
    const id = await category.idCategoria;
    const name = await category.nombreCategoria.toLowerCase(); 
    return id ? [id, name] : [undefined, undefined];
};