import 'server-only';

import { Palabra } from '@/interfaces/palabraInterface';
import { SearchPalabra } from '@/interfaces/commonInterfaces';
import { normalizeString } from '@/lib/utils';
import { getCategory, getCategoryBasics } from './categories.service';
import { getLevelBasics, getLevelData } from './level.service';

// * INICIO DE CRUD PALABRAS

// CREATE
export async function createWord(word:Palabra) {
    try {
        const response = await fetch(`${process.env.API_URL}/words/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(word),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al crear la palabra: ${errorData.message || response.statusText}`);
        };
        const palabra = await response.json();
        return {success:true, data:palabra};
    } catch (error) {
        console.error("Error en createWord:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// READ
export async function getAllWords(cache?:RequestCache):Promise<Palabra[]> {
    try {
        const response = await fetch(`${process.env.API_URL}/words/`, {
            method: 'GET',
            cache: cache ?? 'default'
        });
        if (!response.ok) {
            throw new Error(`Error al obtener las palabras: ${response.statusText}`);
        };
        const words = await response.json();
        return words;
    } catch (error) {
        console.error("Error en getAllWords:", error);
        return[];
    };
};

// UPDATE
export async function updateWord(word: Palabra, idPalabra:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/words/${idPalabra}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(word),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al actualizar la palabra: ${errorData.message || response.statusText}`);
        };
        const palabra = await response.json();
        return { success:true, data:palabra };
    } catch (error) {
        console.error("Error en updateWord:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// DELETE
export async function deleteWord(idWord:number) {
    try {
        const response = await fetch(`${process.env.API_URL}/words/${idWord}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al eliminar la palabra: ${errorData.message || response.statusText}`);
        };
        const palabra = await response.json();
        return {success:true, data:palabra};
    } catch (error) {
        console.error("Error en deleteWord:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// DELETE MANY
export async function deleteManyWords(idsWords:number[]) {
    try {
        const response = await fetch(`${process.env.API_URL}/words/deleteManyWords`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idsWords)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al eliminar la(s) palabra(s): ${errorData.message || response.statusText}`);
        };
        const user = await response.json();
        return {success:true, data:user};
    } catch (error) {
        console.error("Error en deleteManyWords:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido';
        return { success: false, error: errorMessage };
    };
};

// * FIN DE CRUD PALABRAS

export async function getWordsFrom(idCategoria:number) {
    try {
        const response= await fetch(`${process.env.API_URL}/words/getAllByCategory/${idCategoria}`);
        if (!response.ok) {
            throw new Error(`Error al obtener las palabras: ${response.statusText}`);
        }
        const words = await response.json();
        return words;
    } catch (error) {
        console.error("Error en getWordsFrom:", error);
        return[];
    };
};

export async function getAllWordsFromLevel(idNivel:number) {
    try {
        const response= await fetch(`${process.env.API_URL}/words/getAllWordsFromLevel/${idNivel}`, {
            // TODO: SIN CACHÉ PARA LAS PRUEBAS, LUEGO ELIMINAR
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache', // Compatibilidad con navegadores más antiguos
            },
        });
        if (!response.ok) {
            throw new Error(`Error al obtener las palabras: ${response.statusText}`);
        }
        const words = await response.json();
        return words;
    } catch (error) {
        console.error("Error en getAllWordsFromLevel:", error);
        return[];
    };
};

export async function getWordTitle(idPalabra:number):Promise<string>{
    const words = await getAllWords();
    const name = await words.find(c => c.idPalabra == idPalabra )?.nombrePalabra.toLowerCase(); 
    return name ?? '';
};

export async function getWordBasics(words:Palabra[], idPalabra:number):Promise<[number | undefined, string | undefined]>{
    const id = await words.find(w => w.idPalabra == idPalabra )?.idPalabra;
    const name = await words.find(w => w.idPalabra == idPalabra )?.nombrePalabra.toLowerCase(); 
    return id ? [id, name] : [undefined, undefined];
};

export async function getWordsFromInput(input:string):Promise<SearchPalabra[]> {
    // ? Usar el no-store de forma temporal, para cuando agreguemos palabras funcione esto.
    const noStore : RequestCache = 'no-store';
    const words = await getAllWords(noStore);

    const filteredWords = words.filter((word: Palabra) => {
        const normalizedWord = normalizeString(word.nombrePalabra).toLowerCase();
        const normalizedInput = normalizeString(input).toLowerCase();
        return normalizedWord.includes(normalizedInput);
    });

    const wordList: SearchPalabra[] = await Promise.all(
        filteredWords.map(async (word: Palabra) => {
            const wordBasics = await getWordBasics(words, word.idPalabra);
            const category = await getCategory(word.idCategoria);
            const categoryBasics = await getCategoryBasics(category);
            const level = await getLevelData(category!.idNivel);
            // TODO: ARREGLAR CONJUNTO A LA LLAMADA DE API LOS DATOS DEL NIVEL
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
export async function getWordById(idPalabra: number, idCategoria: number): Promise<Palabra | null> {
    try {
        const words = await getWordsFrom(idCategoria);
        console.log("Lista de palabras obtenida:", words);

        const palabra = words.find((word: Palabra) => word.idPalabra === idPalabra) || null;

        if (!palabra) {
            console.error(`Palabra con id ${idPalabra} no encontrada en la categoría ${idCategoria}`);
        }

        return palabra;
    } catch (error) {
        console.error("Error en getWordById:", error);
        return null;
    }
}
