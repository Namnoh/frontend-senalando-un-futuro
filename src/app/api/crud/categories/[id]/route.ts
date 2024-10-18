import { NextResponse } from 'next/server';
import { updateCategory, deleteCategory } from '@/services/categories.service';
import { Categoria } from '@/interfaces/categoriaInterface';

export async function PATCH(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const category: Categoria = await request.json(); // Obtener el cuerpo de la solicitud
        console.log(category);
        const response = await updateCategory(category, Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo actualizar la categoria.' }, { status: 500 }); // Manejo de errores
    }
};

export async function DELETE(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const response = await deleteCategory(Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo eliminar la categoria.' }, { status: 500 }); // Manejo de errores
    }
};