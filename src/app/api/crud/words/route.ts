import { NextResponse } from 'next/server';
import { createWord, getAllWords } from '@/services/words.service';
import { Palabra } from '@/interfaces/palabraInterface';

export async function GET(): Promise<NextResponse<Palabra[]>> {
    const words = await getAllWords();
    return NextResponse.json(words);
};

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const word = await request.json(); // Obtener el cuerpo de la solicitud
        const response = await createWord(word);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo crear la palabra.' }, { status: 500 }); // Manejo de errores
    }
};