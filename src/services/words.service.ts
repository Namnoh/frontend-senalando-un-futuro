import { Palabra } from '@/interfaces/palabraInterface';
import { SearchPalabra } from '@/interfaces/commonInterfaces';
import { normalizeString } from '@/lib/utils';
import { getCategory, getCategoryBasics, getCategoryTitle } from './categories.service';
import { getLevelBasics, getLevelData } from './level.service';

const words:Palabra[] = [
    {idPalabra: 1, nombrePalabra: "PerroAKLSHDFKLASLKJDFHALSKHDFKJLAHSDFHALSHDFLAHSLDKFHLKSHDFLKASDLKJFHASKDHFLKJASDFLKJHASLKJDFHALKSWJDHFLKASDFLKJHASDKJFHALKSJDHFKJJAH", iconoPalabra: 'Dog', videoPalabra: '', status:true, idCategoria: 2,},
    {idPalabra: 2, nombrePalabra: "Gato", iconoPalabra: 'Cat', videoPalabra: '', status:false, idCategoria: 2,},
    {idPalabra: 3, nombrePalabra: "Conejo", iconoPalabra: 'Rabbit', videoPalabra: '', status:false, idCategoria: 2,},
    {idPalabra: 4, nombrePalabra: "Ardilla", iconoPalabra: 'Squirrel', videoPalabra: '', status:true, idCategoria: 2,},
    {idPalabra: 5, nombrePalabra: "Tortuga", iconoPalabra: 'Turtle', videoPalabra: '', status:false, idCategoria: 2,},
    {idPalabra: 6, nombrePalabra: "Perro", iconoPalabra: 'Dog', videoPalabra: '', status:false, idCategoria: 1,},
    {idPalabra: 7, nombrePalabra: "Gato", iconoPalabra: 'Cat', videoPalabra: '', status:false, idCategoria: 1,},
    {idPalabra: 8, nombrePalabra: "Conejo", iconoPalabra: 'Rabbit', videoPalabra: '', status:false, idCategoria: 1,},
    {idPalabra: 9, nombrePalabra: "Ardilla", iconoPalabra: 'Squirrel', videoPalabra: '', status:true, idCategoria: 1,},
    {idPalabra: 10, nombrePalabra: "Tortuga", iconoPalabra: 'Turtle', videoPalabra: '', status:true, idCategoria: 1,},
]

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getWordsFrom(idCategoria:number) {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const wordList = words.filter(word => word.idCategoria === Number(idCategoria));
    return wordList;
}

// TODO: validar que el usuario tiene acceso a ese nivel de donde pide la categoría
export async function getAllWords():Promise<Palabra[]> {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const wordsList = words;
    return wordsList;
};

export async function getWordTitle(idPalabra:number):Promise<string>{
    const name = await words.find(c => c.idPalabra == idPalabra )?.nombrePalabra.toLowerCase(); 
    return name ?? '';
}

export async function getWordBasics(idPalabra:number):Promise<[number | undefined, string | undefined]>{
    const id = await words.find(w => w.idPalabra == idPalabra )?.idPalabra;
    const name = await words.find(w => w.idPalabra == idPalabra )?.nombrePalabra.toLowerCase(); 
    return id ? [id, name] : [undefined, undefined];
}

export async function getWordsFromInput(input:string):Promise<SearchPalabra[]> {
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const filteredWords = words.filter((word: Palabra) => {
        const normalizedWord = normalizeString(word.nombrePalabra).toLowerCase();
        const normalizedInput = normalizeString(input).toLowerCase();
        return normalizedWord.includes(normalizedInput);
    });

    const wordList: SearchPalabra[] = await Promise.all(
        filteredWords.map(async (word: Palabra) => {
            const wordBasics = await getWordBasics(word.idPalabra);
            const category = await getCategory(word.idCategoria);
            const categoryBasics = await getCategoryBasics(category!.idCategoria);
            const level = await getLevelData(category!.idNivel);
            const levelBasics = await getLevelBasics(level!.id);
            return {
                idPalabra: wordBasics[0],
                nombrePalabra: wordBasics[1],
                idCategoria: categoryBasics[0],
                nombreCategoria: categoryBasics[1],
                idNivel: levelBasics[0],
                nombreNivel: levelBasics[1]
            } as SearchPalabra;
        })
    );
    return wordList;
};