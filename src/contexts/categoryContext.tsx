// 'use client'

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { Categoria } from "@/interfaces/categoriaInterface";

// type CategoryContextProviderProps = {
//     children: React.ReactNode;
// }

// type Categories = Categoria[];

// type CategoryContext = {
//     categories: Categories;
//     addCategory: (newCategory: Categoria) => void;
//     // setCategory: React.Dispatch<React.SetStateAction<Category>>;
// }

// export const CategoryContext = createContext<CategoryContext | null>(null);

// export default function CategoryContextProvider({children} : CategoryContextProviderProps) {
//     const [categories, setCategories] = useState<Categories>([]);
//     // Recuperamos las categorías del localStorage al montar el componente
//     // Función para agregar una nueva categoría
//     const addCategory = (newCategory: Categoria) => {
//         setCategories(prevCategories => [...prevCategories, newCategory]);
//     };

//     return (
//         <CategoryContext.Provider value={{categories, addCategory }}>
//             {children}
//         </CategoryContext.Provider>
//     );
// };

// export function useCategoryContext() {
//     const context = useContext(CategoryContext);
//     if (!context) {
//         throw new Error("useCategoryContext debe ser utilizado dentro de CategoryContextProvider")
//     };
//     return context;
// }