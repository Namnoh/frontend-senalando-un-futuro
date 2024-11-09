import { NextResponse } from 'next/server';
import { createUser, getAllUsers } from '@/services/users.service';
import { Usuario, NuevoUsuario } from '@/interfaces/usuarioInterface';

export async function GET(): Promise<NextResponse<Usuario[]>> {
    const users = await getAllUsers();
    return NextResponse.json(users);
};

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const newUser: NuevoUsuario = await request.json(); // Obtener el cuerpo de la solicitud
        const response = await createUser(newUser);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 }); // Retornar el usuario creado con código de estado 201
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo crear el usuario.' }, { status: 500 }); // Manejo de errores
    }
};