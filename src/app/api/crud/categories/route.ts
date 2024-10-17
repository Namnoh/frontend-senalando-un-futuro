import { NextResponse } from 'next/server';
import { createCategory, getAllCategories } from '@/services/categories.service';
import { Categoria } from '@/interfaces/categoriaInterface';

export async function GET(): Promise<NextResponse<Categoria[]>> {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
};

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const category: Categoria = await request.json(); // Obtener el cuerpo de la solicitud
        const response = await createCategory(category);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 }); // Retornar el usuario creado con código de estado 201
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo crear la categoria.' }, { status: 500 }); // Manejo de errores
    }
}