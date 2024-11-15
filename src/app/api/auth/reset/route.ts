import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parseamos el cuerpo de la solicitud JSON
    const { email } = await req.json();

    // Validación simple del email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'El correo electrónico es requerido y debe ser una cadena válida.' },
        { status: 400 }
      );
    }

    // Llamada a la API de backend 
    const response = await fetch(`${process.env.API_URL}/auth/reset-password-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    // Manejo de la respuesta del backend
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al solicitar el restablecimiento de contraseña:', errorData);
      
      if (errorData?.message && errorData?.message.includes('Usuario no encontrado')) {
        // Si el backend responde con un mensaje que indica que el usuario no existe
        return NextResponse.json(
          { error: 'Correo electrónico no registrado.' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: errorData.message || 'Error al procesar la solicitud de restablecimiento de contraseña.' },
        { status: response.status }
      );
    }

    // Si la respuesta es exitosa, obtenemos el mensaje y lo enviamos al cliente
    const data = await response.json();
    return NextResponse.json(
      { message:'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.' },
      { status: 200 }
      
    );
    
  } catch (error) {
    // Manejo de errores generales (fallos en el fetch o problemas internos)
    console.error('Error en la ruta API de solicitud de restablecimiento de contraseña:', error);
    return NextResponse.json(
      { error: 'No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
