import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            return NextResponse.json({ error: 'Token y nueva contraseña son requeridos.' }, { status: 400 });
        }
        console.log('token enviado de la pagina ', token)
        const response = await fetch(`${process.env.API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al restablecer la contraseña:", errorData);
            return NextResponse.json(
                { error: errorData.message || 'Error al restablecer la contraseña.' },
                {status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(
        { message: data.message || 'Contraseña restablecida con éxito.' },
        { status: 200 }
        );
    } catch (error) {
        console.error('Error en la ruta API de restablecimiento de contraseña:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}