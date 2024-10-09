import { Categoria } from '@/interfaces/categoriaInterface';


const categories:Categoria[] = [
    {idCategoria: 1, nombreCategoria: "Abecedario", descripcionCategoria:'', iconoCategoria: 'ArrowDownAZ', bgCategoria: 'https://plus.unsplash.com/premium_photo-1666739032615-ecbd14dfb543?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', idNivel: 1, status: 0},
    {idCategoria: 2, nombreCategoria: "Animales", descripcionCategoria:'', iconoCategoria: 'Cat', bgCategoria: 'https://amazonianproject.org/wp-content/uploads/2017/11/Rainforest_5.jpg', idNivel: 1, status: .55},
    {idCategoria: 3, nombreCategoria: "Colores", descripcionCategoria:'', iconoCategoria: 'Palette', bgCategoria: 'a', idNivel: 1, status: 0},
    {idCategoria: 4, nombreCategoria: "Números", descripcionCategoria:'', iconoCategoria: 'ArrowUp10', bgCategoria: 'a', idNivel: 1, status: 1},
    {idCategoria: 5, nombreCategoria: "Ejemplo", descripcionCategoria:'', iconoCategoria: 'Home', bgCategoria: 'a', idNivel: 2, status: 1},
]

export async function getCategory(idCategoria:number) {
    // TODO: Revisar qué pasa cuando la petición se demora
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const category = categories.find(category => category.idCategoria === Number(idCategoria));
    return category;
}

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getCategoriesFrom(idNivel:number) {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const categoryList = categories.filter(category => category.idNivel === Number(idNivel));
    return categoryList;
}