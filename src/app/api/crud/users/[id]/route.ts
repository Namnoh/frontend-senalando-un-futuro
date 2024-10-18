import { NextResponse } from 'next/server';
import { deleteUser, updateUser } from '@/services/users.service';
import { NuevoUsuario, Usuario } from '@/interfaces/usuarioInterface';

export async function PATCH(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const user: NuevoUsuario = await request.json(); // Obtener el cuerpo de la solicitud
        console.log(user);
        const response = await updateUser(user, Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        console.log(response)
        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo actualizar el usuario.' }, { status: 500 }); // Manejo de errores
    }
};

export async function DELETE(request: Request, context:any): Promise<NextResponse> {
    try {
        const { params } = context;
        const response = await deleteUser(Number(params.id));
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo eliminar el usuario.' }, { status: 500 }); // Manejo de errores
    }
};