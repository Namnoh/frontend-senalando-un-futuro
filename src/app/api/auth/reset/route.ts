// src/app/api/auth/reset/page.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'El correo electrónico es requerido.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error al procesar la solicitud.' }, { status: response.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error al enviar la solicitud al backend:', error);
    return NextResponse.json({ message: 'Error al procesar la solicitud.' }, { status: 500 });
  }
}
