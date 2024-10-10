import { Dog, Cat, Rabbit, Squirrel, Turtle } from 'lucide-react';
import { Palabra } from '@/interfaces/palabraInterface';

const words:Palabra[] = [
    {idPalabra: 1, nombrePalabra: "Perro", iconoPalabra: Dog, videoPalabra: '', status:true, idCategoria: 2,},
    {idPalabra: 2, nombrePalabra: "Gato", iconoPalabra: Cat, videoPalabra: '', status:false, idCategoria: 2,},
    {idPalabra: 3, nombrePalabra: "Conejo", iconoPalabra: Rabbit, videoPalabra: '', status:false, idCategoria: 2,},
    {idPalabra: 4, nombrePalabra: "Ardilla", iconoPalabra: Squirrel, videoPalabra: '', status:true, idCategoria: 2,},
    {idPalabra: 5, nombrePalabra: "Tortuga", iconoPalabra: Turtle, videoPalabra: '', status:false, idCategoria: 2,},
    {idPalabra: 6, nombrePalabra: "Perro", iconoPalabra: Dog, videoPalabra: '', status:false, idCategoria: 1,},
    {idPalabra: 7, nombrePalabra: "Gato", iconoPalabra: Cat, videoPalabra: '', status:false, idCategoria: 1,},
    {idPalabra: 8, nombrePalabra: "Conejo", iconoPalabra: Rabbit, videoPalabra: '', status:false, idCategoria: 1,},
    {idPalabra: 9, nombrePalabra: "Ardilla", iconoPalabra: Squirrel, videoPalabra: '', status:true, idCategoria: 1,},
    {idPalabra: 10, nombrePalabra: "Tortuga", iconoPalabra: Turtle, videoPalabra: '', status:true, idCategoria: 1,},
]

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getWordsFrom(idCategoria:number) {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const wordList = words.filter(words => words.idCategoria === Number(idCategoria));
    return wordList;
}

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getAllWords():Promise<Palabra[]> {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const wordsList = words;
    return wordsList;
};