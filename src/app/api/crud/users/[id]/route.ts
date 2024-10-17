import { NextResponse } from 'next/server';
import { deleteUser } from '@/services/users.service';

export async function DELETE(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const response = await deleteUser(Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 }); // Retornar el usuario creado con código de estado 201
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo eliminar el usuario.' }, { status: 500 }); // Manejo de errores
    }
};