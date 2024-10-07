import { Dog, Cat, Rabbit, Squirrel, Turtle } from 'lucide-react';

const words = [
    {id: 1, nombre: "Perro", icono: Dog, idCategoria: 2},
    {id: 2, nombre: "Gato", icono: Cat, idCategoria: 2},
    {id: 3, nombre: "Conejo", icono: Rabbit, idCategoria: 2},
    {id: 4, nombre: "Ardilla", icono: Squirrel, idCategoria: 2},
    {id: 5, nombre: "Tortuga", icono: Turtle, idCategoria: 2},
]

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getWordsFrom(idCategoria:number) {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const wordList = words.filter(words => words.idCategoria === Number(idCategoria));
    return wordList;
}