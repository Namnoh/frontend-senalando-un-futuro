// const VALID_TYPES = ['usuario', 'categoria', 'palabra'];
// TODO: Hacer servicio general para las peticiones
// export async function deleteItem(id:number, type:string) {
//     if (!VALID_TYPES.includes(type)) {
//         throw new Error(`Invalid type: ${type}`); // Validación de tipo
//     }
//     try {
//         const response = await fetch(`${BASE_URI}/${type}/${id}`, { method: "DELETE" });
        
//         if (!response.ok) {
//             throw new Error(`Failed to delete ${type} with id ${id}: ${response.statusText}`); // Manejo de errores
//         }

//         return await response.json(); // Retorna la respuesta si es necesario
//     } catch (error) {
//         console.error(error);
//         throw error; // Vuelve a lanzar el error después de registrar
//     }
// }