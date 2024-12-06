import { NextResponse } from 'next/server';
import { deleteManyWords } from '@/services/words.service';

export async function POST(request: Request, context:any): Promise<NextResponse> {
    try {
        const idList = await request.json(); // Obtener el cuerpo de la solicitud
        const numericIdList = idList.map((id: string) => Number(id));
        const response = await deleteManyWords(numericIdList);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo actualizar el usuario.' }, { status: 500 }); // Manejo de errores
    }
};