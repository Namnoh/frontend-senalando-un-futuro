// src/app/api/auth/reset/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import bcrypt from 'bcrypt';

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
export async function PATCH(req: NextRequest) {
  try {
    const { token, newPassword, confirmPassword } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json({ error: 'La nueva contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Las contraseñas no coinciden' }, { status: 400 });
    }

    // Verificar el token y cambiar la contraseña
    const response = await fetch(`${process.env.API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Error al restablecer la contraseña' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error('Error en la ruta API de restablecimiento de contraseña:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}