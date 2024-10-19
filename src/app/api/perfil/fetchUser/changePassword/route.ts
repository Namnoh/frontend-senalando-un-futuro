import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    const { email, currentPassword, newPassword } = await request.json()

    try {
        // Primero, obtén el usuario actual
        const userResponse = await fetch(`${process.env.API_URL}/users/authorize/${email}`, {
        method: 'GET',
        })

        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
        }

        const user = await userResponse.json()

        // Verifica la contraseña actual
        const isPasswordValid = await bcrypt.compare(currentPassword, user.contrasenaUsuario)

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 400 })
        }

        // Hashea la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        // Actualiza la contraseña del usuario
        const updateResponse = await fetch(`${process.env.API_URL}/users/update-password/${user.idUsuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: hashedNewPassword }),
        })

        if (!updateResponse.ok) {
            return NextResponse.json({ error: 'Error al actualizar la contraseña' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Contraseña actualizada con éxito' })
    } 
    catch (error) {
            console.error('Error al cambiar la contraseña:', error)
            return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}