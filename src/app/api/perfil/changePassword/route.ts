import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import bcrypt from "bcrypt";

export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }
        const { currentPassword, newPassword } = await request.json();
        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
        }

        const res = await fetch(
            `${process.env.API_URL}/users/authorize/${session.user.email}`,
            {
                method: "GET",
            }
        );
        if (!res.ok) {
            return NextResponse.json({ error: 'Error al obtener información del usuario' }, { status: res.status });
        }

        const user = await res.json();

        const matchPassword = await bcrypt.compare(
            currentPassword,
            user.contrasenaUsuario
        );
        if (!matchPassword) {
            return NextResponse.json({ error: 'La contraseña actual es incorrecta' }, { status: 400 });
        }
        if (currentPassword === newPassword) {
            return NextResponse.json({ error: 'La nueva contraseña no puede ser igual a la actual' }, { status: 400 });
        }
        const nuevaContrasenaHasheada = await bcrypt.hash(newPassword, 10);
        console.log("hasheado : ",  nuevaContrasenaHasheada)
        const response = await fetch(`${process.env.API_URL}/users/change-password/${session.user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nuevaContrasena: nuevaContrasenaHasheada
            }),
        });
        console.log(response)
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error de backend:", errorData);
            return NextResponse.json({ error: errorData.message || 'Error al cambiar la contraseña' }, { status: response.status });
        }

        return NextResponse.json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error en la ruta API de cambio de contraseña:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}