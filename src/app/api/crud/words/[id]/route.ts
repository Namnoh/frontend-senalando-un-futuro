import { NextResponse } from 'next/server';
import { Palabra } from '@/interfaces/palabraInterface';
import { deleteWord, updateWord } from '@/services/words.service';

export async function PATCH(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const word: Palabra = await request.json(); // Obtener el cuerpo de la solicitud
        console.log(word);
        const response = await updateWord(word, Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo actualizar la palabra.' }, { status: 500 }); // Manejo de errores
    }
};

export async function DELETE(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const response = await deleteWord(Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo eliminar la palabra.' }, { status: 500 }); // Manejo de errores
    }
};