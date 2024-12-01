export async function getWordIds(path: string): Promise<string[]> {
    const response = await fetch(path)
    const data = await response.json()
    return Object.values(data)
}

export const wordsText: { [key: string]: string } = {
    // Aquí debes incluir tu diccionario de palabras
    '1': 'A',
    '2': 'B',
    '3': 'C',
    '4': 'BIEN',
    '5': 'BUENOS DÍAS',
    '6': 'CÓMO ESTÁS',
    '7': 'HOLA',
    '8': 'MAL',
}