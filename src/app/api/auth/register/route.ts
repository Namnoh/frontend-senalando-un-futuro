import { registerUser } from '@/services/users.service';
import { Usuario, UsuarioRes } from '@/interfaces/usuarioInterface';
import { NextResponse } from 'next/server';


export async function POST(request: Request): Promise<NextResponse> {
    try {
        
        const userRegister: UsuarioRes = await request.json(); // Obtener el cuerpo de la solicitud
        const { confirmPassword, ...usuario } = userRegister;
        
        const response = await registerUser(usuario);
        console.log(response)
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 500 });
        };
        return NextResponse.json(response.data, { status: 201 }); // Retornar el usuario creado con código de estado 201
    } catch (error) {
        console.error("Error en POST:", error);
        return NextResponse.json({ error: 'No se pudo crear el usuario.' }, { status: 500 }); // Manejo de errores
    }
};