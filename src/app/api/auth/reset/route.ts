// src/app/api/auth/reset/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'El correo electrónico es requerido y debe ser una cadena válida.' }, { status: 400 });
    }

    const response = await fetch(`${process.env.API_URL}/auth/reset-password-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al solicitar el restablecimiento de contraseña:", errorData);
      return NextResponse.json(
        { error: errorData.message || 'Error al procesar la solicitud de restablecimiento de contraseña.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { message: data.message || 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en la ruta API de solicitud de restablecimiento de contraseña:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}